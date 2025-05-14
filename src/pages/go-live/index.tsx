import React from 'react';
import { ConfiguredLayout } from '@site/src/components/Templates/ConfiguredLayout';
import { CreateConfig } from '@site/src/components/Pages/CreateConfig';
import { useParams } from 'react-router-dom';

const CreateConfigPage = () => {
  const { walletAddress, pool, secondPool } = useParams<{
    walletAddress: string;
    pool: string;
    secondPool: string;
  }>();

  return (
    <ConfiguredLayout>
      <CreateConfig
        address={walletAddress}
        pool={pool}
        secondPool={secondPool}
      />
    </ConfiguredLayout>
  );
};

export default CreateConfigPage;
