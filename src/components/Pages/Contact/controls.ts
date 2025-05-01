import { useMemo } from 'react';
import usePageControls from '@site/src/hooks/usePageControls';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const useControls = () => {
  // Use shared logic from usePageControls
  const { infoBoxMapData, isLoadingMapChart } = usePageControls({
    defaultRegion: 'DE',
    includeInfoBox: true,
  });
  const { siteConfig } = useDocusaurusContext();

  // Page-specific logic for maintainers data
  const maintainersData = useMemo(() => {
    const customFields = siteConfig.customFields as Partial<{
      MAINTAINERS_SUPPORT_EMAIL:
        | string
        | (string | { [email: string]: string })[];
      MAINTAINERS_SUPPORT_DESCRIPTION: string;
      MAINTAINERS_SECURITY_EMAIL:
        | string
        | (string | { [email: string]: string })[];
      MAINTAINERS_SECURITY_DESCRIPTION: string;
      MAINTAINERS_COMMERCIAL_EMAIL:
        | string
        | (string | { [email: string]: string })[];
      MAINTAINERS_COMMERCIAL_DESCRIPTION: string;
    }>;

    return {
      maintainersSupportEmail: customFields.MAINTAINERS_SUPPORT_EMAIL ?? [],
      maintainersSupportDescription:
        customFields.MAINTAINERS_SUPPORT_DESCRIPTION ?? '',
      maintainersSecurityEmail: customFields.MAINTAINERS_SECURITY_EMAIL ?? [],
      maintainersSecurityDescription:
        customFields.MAINTAINERS_SECURITY_DESCRIPTION ?? '',
      maintainersCommercialEmail:
        customFields.MAINTAINERS_COMMERCIAL_EMAIL ?? [],
      maintainersCommercialDescription:
        customFields.MAINTAINERS_COMMERCIAL_DESCRIPTION ?? '',
    };
  }, []);

  return {
    ...maintainersData,
    infoBoxMapData,
    isLoadingMapChart,
  };
};

export default useControls;
