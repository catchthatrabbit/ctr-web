import React from 'react';
import { useHistory } from 'react-router-dom';
import InfoPanel from '@site/src/components/Molecules/InfoPanel/InfoPanel';
import { ConfiguredInfoBox } from '../../Molecules/ConfiguredInfoBox';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { SelectPoolTitle } from '../../Molecules/PictureTitles';
import { Spacer } from '../../Atoms/Spacer';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';
import usePageControls from '@site/src/hooks/usePageControls';

const PoolSelectionPage = ({
  pools,
  walletAddress,
}: {
  pools: any[];
  walletAddress: string;
}) => {
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();
  const { POOLS_LIST } = siteConfig.customFields;
  const { mobile, tablet } = useMediaQueries();

  const handleSelectPool = (pool: any) => {
    console.log('Selected pool:', pool);
    history.push(`/coreid/${walletAddress}/${pool.region}`);
  };

  const { infoBoxMapData, isLoadingMapChart } = usePageControls({
    defaultRegion: 'DE',
    includeInfoBox: true,
  });

  return (
    <>
      {(mobile || tablet) && (
        <ConfiguredInfoBox
          infoItems={infoBoxMapData}
          isLoading={isLoadingMapChart}
        />
      )}
      <div className="pool-selection-page">
        <Spacer variant="xxxxl" />
        <SelectPoolTitle />
        <Spacer variant="xxl" />
        <div
          className="pool-list"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
          }}
        >
          {pools.map((pool, index) => {
            const poolInfo = POOLS_LIST[pool.region.toUpperCase()];
            return (
              <InfoPanel
                key={index}
                title={poolInfo?.NAME || pool.region.toUpperCase()}
                text={
                  poolInfo?.DESCRIPTION || `API URL: ${pool.apiUrlWithPath}`
                }
                link="#"
                linkText="Select Pool"
                onClick={() => handleSelectPool(pool)}
              />
            );
          })}
        </div>
        <Spacer variant="xxxl" />
      </div>
    </>
  );
};

export default PoolSelectionPage;
