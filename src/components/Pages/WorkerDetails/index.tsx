import React from 'react';
import { useParams } from 'react-router-dom';
import { ConfiguredLayout } from '@site/src/components/Templates/ConfiguredLayout';
import { convertWorkerName } from '@site/src/utils/convertWorkerName';
import WorkerDetailsContent from './WorkerDetailsPage';

const WorkerDetailsPageWrapper = () => {
  const { workerName: workerNameEncoded } = useParams<{
    workerName: string;
  }>();
  const workerName = workerNameEncoded
    ? decodeURIComponent(workerNameEncoded)
    : '';
  const { caption: displayName } = convertWorkerName(workerName);
  const customTitle = displayName
    ? `${displayName} – Worker details`
    : 'Worker details';

  return (
    <ConfiguredLayout customTitle={customTitle}>
      <WorkerDetailsContent />
    </ConfiguredLayout>
  );
};

export default WorkerDetailsPageWrapper;
