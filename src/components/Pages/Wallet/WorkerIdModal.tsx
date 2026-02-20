import React, { useEffect, useState } from 'react';
import { Modal } from '@site/src/components/Atoms/Modal';
import { Text } from '@site/src/components/Atoms/Text';
import { CopyButtonSmall } from '@site/src/components/Molecules/CopyButton';
import styles from './WorkerIdModal.module.css';

interface WorkerIdModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerId: string | undefined;
}

const WorkerIdModal: React.FC<WorkerIdModalProps> = ({
  isOpen,
  onClose,
  workerId,
}) => {
  const [barcodeReady, setBarcodeReady] = useState(false);
  const [barcodeDataUrl, setBarcodeDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !workerId) {
      setBarcodeReady(false);
      setBarcodeDataUrl(null);
      return;
    }
    let cancelled = false;
    const drawBarcode = async () => {
      try {
        const generateBarcode = (await import('pdf417')).default;
        if (cancelled) return;
        const dataUrl = generateBarcode(workerId, 2, 2);
        if (!cancelled && dataUrl) {
          setBarcodeReady(true);
          setBarcodeDataUrl(dataUrl);
        }
      } catch (err) {
        if (!cancelled) {
          setBarcodeReady(false);
          setBarcodeDataUrl(null);
        }
      }
    };
    drawBarcode();
    return () => {
      cancelled = true;
    };
  }, [isOpen, workerId]);

  const handleDownload = async () => {
    if (!workerId) return;
    try {
      const generateBarcode = (await import('pdf417')).default;
      const highResDataUrl = generateBarcode(workerId, 6, 6);
      if (!highResDataUrl) return;
      const a = document.createElement('a');
      a.href = highResDataUrl;
      a.download = `worker-id-${workerId}.png`;
      a.click();
    } catch (err) {
      console.error('Error generating high-res barcode for download:', err);
    }
  };

  if (!workerId) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Worker ID">
      <div className={styles.content}>
        <div className={styles.row}>
          <Text
            type="zephirum"
            variant="subheading"
            weight="semiBold"
            color="white"
            className={styles.workerIdText}
          >
            {workerId}
          </Text>
          <CopyButtonSmall
            textToCopy={workerId}
            toastText="Worker ID copied to clipboard"
          />
        </div>
        <div className={styles.barcodeRow}>
          {barcodeDataUrl && (
            <img
              src={barcodeDataUrl}
              alt="PDF417 barcode"
              className={styles.barcodeCanvas}
            />
          )}
          <button
            type="button"
            onClick={handleDownload}
            className={styles.downloadButton}
            disabled={!barcodeReady}
          >
            Download barcode
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WorkerIdModal;
