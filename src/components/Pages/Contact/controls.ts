import usePageControls from '@site/src/hooks/usePageControls';

const useControls = () => {
  const { infoBoxMapData, isLoadingMapChart } = usePageControls({
    defaultRegion: 'DE',
    includeInfoBox: true,
  });

  return {
    infoBoxMapData,
    isLoadingMapChart,
  };
};

export default useControls;
