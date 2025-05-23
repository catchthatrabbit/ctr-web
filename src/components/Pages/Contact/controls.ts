import usePageControls from '@site/src/hooks/usePageControls';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface CustomFields {
  DEFAULT_REGION: string;
}

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();
  const { DEFAULT_REGION } = siteConfig.customFields as unknown as CustomFields;
  const defaultRegion = DEFAULT_REGION?.toString().toUpperCase() || 'DE';

  const { infoBoxMapData, isLoadingMapChart } = usePageControls({
    defaultRegion,
    includeInfoBox: true,
  });

  return {
    infoBoxMapData,
    isLoadingMapChart,
  };
};

export default useControls;
