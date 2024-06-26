import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

interface CustomFields {
  MAINTAINERS_SUPPORT_EMAIL?: string | (string | { [email: string]: string })[];
  MAINTAINERS_SUPPORT_DESCRIPTION?: string;
  MAINTAINERS_SECURITY_EMAIL?: string | (string | { [email: string]: string })[];
  MAINTAINERS_SECURITY_DESCRIPTION?: string;
  MAINTAINERS_COMMERCIAL_EMAIL?: string | (string | { [email: string]: string })[];
  MAINTAINERS_COMMERCIAL_DESCRIPTION?: string;
}

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();

  const customFields = siteConfig.customFields as Partial<CustomFields>;

  const maintainersSupportEmail = customFields.MAINTAINERS_SUPPORT_EMAIL ?? [];
  const maintainersSupportDescription = customFields.MAINTAINERS_SUPPORT_DESCRIPTION ?? "";
  const maintainersSecurityEmail = customFields.MAINTAINERS_SECURITY_EMAIL ?? [];
  const maintainersSecurityDescription = customFields.MAINTAINERS_SECURITY_DESCRIPTION ?? "";
  const maintainersCommercialEmail = customFields.MAINTAINERS_COMMERCIAL_EMAIL ?? [];
  const maintainersCommercialDescription = customFields.MAINTAINERS_COMMERCIAL_DESCRIPTION ?? "";

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
