// eslint-disable-next-line import/no-unresolved
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  CORE_CLIENT_URL,
  ICAN_WALLET_URL,
} from "@site/src/configs/start-minings.config";

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();
  const urlsConfig = siteConfig.customFields.URLS as URLS_CONFIG_TYPE;
  const startMiningPoolConfigurations = siteConfig.customFields
    .START_MINING_POOL_CONFIGURATIONS as START_MINING_POOL_CONFIGURATIONS;

  return {
    goCoreClientUrl: String(urlsConfig.GO_CORE_CLIENT_URL),
    icanWalletUrl: String(urlsConfig.ICAN_WALLET_URL),
    githubReleaseDownloadUrl: String(urlsConfig.GITHUB_RELEASE_DOWNLOAD_URL),
    githubRawMineSh: String(urlsConfig.GITHUB_RAW_MINE_SH),
    startMiningPoolConfigurations,
  };
};

export { useControls };
