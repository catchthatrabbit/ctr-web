// eslint-disable-next-line import/no-unresolved
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  GO_CORE_CLIENT_URL,
  ICAN_WALLET_URL,
} from "@site/src/configs/start-minings.config";

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;

  return {
    GO_CORE_CLIENT_URL: (customFields.GO_CORE_CLIENT_URL
      ? customFields.GO_CORE_CLIENT_URL
      : GO_CORE_CLIENT_URL) as string,
    ICAN_WALLET_URL: (customFields.ICAN_WALLET_URL
      ? customFields.ICAN_WALLET_URL
      : ICAN_WALLET_URL) as string,
  };
};

export { useControls };
