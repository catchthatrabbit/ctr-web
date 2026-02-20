import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Text } from '@site/src/components/Atoms/Text';
import { CopyButtonSmall } from '@site/src/components/Molecules/CopyButton';
import { useFetchWorkersByWalletAddress } from '@site/src/hooks/useWallet';
import { convertWorkerName } from '@site/src/utils/convertWorkerName';
import { siFormat } from '@site/src/utils/siFormat';
import { convertTime2Date } from '@site/src/utils/convertTime2Date';
import Blockies from 'react-blockies';
import styles from './styles.module.css';

function buildWorkerId(address: string, workerName: string): string {
  const first4 = address.slice(0, 4).toUpperCase();
  const last4 = address.slice(-4).toUpperCase();
  return first4 + last4 + workerName;
}

const WorkerDetailsContent = () => {
  const { walletAddress, pool, workerName: workerNameEncoded } = useParams<{
    walletAddress: string;
    pool: string;
    workerName: string;
  }>();
  const location = useLocation();
  const region = pool?.toUpperCase() ?? '';
  const workerName = workerNameEncoded
    ? decodeURIComponent(workerNameEncoded)
    : '';

  const { data: workersData, isLoading } = useFetchWorkersByWalletAddress(
    region,
    walletAddress ?? '',
    100,
    0
  );
  const workerStats = workersData?.workers?.[workerName];
  const workerId = useMemo(
    () =>
      walletAddress && workerName
        ? buildWorkerId(walletAddress, workerName)
        : undefined,
    [walletAddress, workerName]
  );
  const { caption: displayName, href: fediverseHref } = useMemo(
    () => convertWorkerName(workerName),
    [workerName]
  );

  const [barcodeReady, setBarcodeReady] = useState(false);
  const [barcodeDataUrl, setBarcodeDataUrl] = useState<string | null>(null);
  const permalink =
    typeof window !== 'undefined'
      ? `${window.location.origin}${location.pathname}`
      : '';

  useEffect(() => {
    if (!workerId || typeof window === 'undefined') {
      setBarcodeReady(false);
      setBarcodeDataUrl(null);
      return;
    }
    let cancelled = false;
    const loadAndDraw = async () => {
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
    loadAndDraw();
    return () => { cancelled = true; };
  }, [workerId]);

  const handleDownloadBarcode = async () => {
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

  if (isLoading || !workerName) {
    return (
      <div className={styles.root}>
        <Text color="white" variant="body">
          Loading…
        </Text>
      </div>
    );
  }

  if (!workerStats) {
    return (
      <div className={styles.root}>
        <Text color="white" variant="body">
          Worker not found.
        </Text>
      </div>
    );
  }

  const isOffline = workerStats.offline;
  const statusLabel = isOffline ? 'Inactive' : 'Active';
  const lastShareStr = workerStats.lastBeat
    ? convertTime2Date(workerStats.lastBeat, {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).replace(', ', ' ')
    : 'Never';

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.profileSection}>
          <div className={styles.blockiesWrapper}>
            <Blockies
              seed={workerId ?? ''}
              size={12}
              scale={6}
              className={styles.blockies}
            />
          </div>
          <Text
            type="zephirum"
            variant="heading3"
            weight="semiBold"
            color="white"
            className={styles.profileName}
          >
            {displayName || workerName}
          </Text>
          {fediverseHref && (
            <a
              href={fediverseHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.fediverseLink}
            >
              {fediverseHref}
            </a>
          )}
          <span
            className={
              isOffline ? styles.statusInactive : styles.statusActive
            }
          >
            {statusLabel}
          </span>
        </div>
      </div>

      <div className={styles.sectionSpacer} />

      <div className={styles.card}>
        <h2 className={styles.panelHeading}>Stats</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <Text variant="smallBody" color="white" weight="medium">
              Hashrate ~30m
            </Text>
            <Text
              type="zephirum"
              variant="body"
              color="white"
              className={styles.statValue}
            >
              {`${siFormat(workerStats.hr, 2)}h/s`}
            </Text>
          </div>
          <div className={styles.statItem}>
            <Text variant="smallBody" color="white" weight="medium">
              Hashrate ~3h
            </Text>
            <Text
              type="zephirum"
              variant="body"
              color="white"
              className={styles.statValue}
            >
              {`${siFormat(workerStats.hr2, 2)}h/s`}
            </Text>
          </div>
          <div className={styles.statItem}>
            <Text variant="smallBody" color="white" weight="medium">
              Last share
            </Text>
            <Text
              type="zephirum"
              variant="body"
              color="white"
              className={styles.statValue}
            >
              {lastShareStr}
            </Text>
          </div>
        </div>
      </div>

      <div className={styles.sectionSpacer} />

      <div className={styles.card}>
        <h2 className={styles.panelHeading}>Worker ID</h2>
        <div className={styles.workerIdInputRow}>
          <input
            type="text"
            readOnly
            value={workerId ?? ''}
            className={styles.workerIdInput}
          />
          <CopyButtonSmall
            textToCopy={workerId ?? ''}
            toastText="Worker ID copied to clipboard"
          />
        </div>
        <div className={styles.barcodeSection}>
          {barcodeDataUrl && (
            <img
              src={barcodeDataUrl}
              alt="PDF417 barcode"
              className={styles.barcodeCanvas}
            />
          )}
          <button
            type="button"
            onClick={handleDownloadBarcode}
            className={styles.downloadButton}
            disabled={!barcodeReady}
          >
            Download PDF417 Code
          </button>
        </div>
      </div>

      <div className={styles.sectionSpacer} />

      <div className={styles.card}>
        <h2 className={styles.panelHeading}>Permalink</h2>
        <div className={styles.permalinkInputRow}>
          <input
            type="text"
            readOnly
            value={permalink}
            className={styles.permalinkInput}
            title={permalink}
          />
          <CopyButtonSmall
            textToCopy={permalink}
            toastText="Permalink copied to clipboard"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkerDetailsContent;
