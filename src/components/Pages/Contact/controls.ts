// eslint-disable-next-line import/no-unresolved
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();

  const maintainersSupportEmail = String(
    siteConfig.customFields.MAINTAINERS_SUPPORT_EMAIL,
  );
  const maintainersSupportDescription = String(
    siteConfig.customFields.MAINTAINERS_SUPPORT_DESCRIPTION,
  );
  const maintainersSecurityEmail = String(
    siteConfig.customFields.MAINTAINERS_SECURITY_EMAIL,
  );
  const maintainersSecurityDescription = String(
    siteConfig.customFields.MAINTAINERS_SECURITY_DESCRIPTION,
  );
  const maintainersCommercialEmail = String(
    siteConfig.customFields.MAINTAINERS_COMMERCIAL_EMAIL,
  );
  const maintainersCommercialDescription = String(
    siteConfig.customFields.MAINTAINERS_COMMERCIAL_DESCRIPTION,
  );

  return {
    maintainersCommercialDescription,
    maintainersCommercialEmail,
    maintainersSecurityDescription,
    maintainersSecurityEmail,
    maintainersSupportDescription,
    maintainersSupportEmail,
  };
};

export { useControls };
