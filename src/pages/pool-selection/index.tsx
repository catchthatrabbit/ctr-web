import React from 'react';
import { useLocation } from 'react-router-dom';
import PoolSelectionPage from '@site/src/components/Pages/SelectPool/PoolSelectionPage';
import { ConfiguredLayout } from '@site/src/components/Templates/ConfiguredLayout';

const PoolSelectionPageIndex = () => {
  const location = useLocation<{ pools: any[]; walletAddress: string }>();
  const { pools, walletAddress } = location.state || {
    pools: [],
    walletAddress: '',
  };

  if (!pools || pools.length === 0) {
    return (
      <ConfiguredLayout>
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <h2>No pools available for selection</h2>
        </div>
      </ConfiguredLayout>
    );
  }

  return (
    <ConfiguredLayout>
      <PoolSelectionPage pools={pools} walletAddress={walletAddress} />
    </ConfiguredLayout>
  );
};

export default PoolSelectionPageIndex;
