// eslint-disable-next-line import/no-unresolved
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  START_MINING_POOL_CONFIGURATIONS,
  URLS_CONFIG_TYPE,
} from "@site/src/configs/types";

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();
  const urlsConfig = siteConfig.customFields.URLS as URLS_CONFIG_TYPE;
  const startMiningPoolConfigurations = siteConfig.customFields
    .START_MINING_POOL_CONFIGURATIONS as START_MINING_POOL_CONFIGURATIONS;

  return {
    coreClientUrl: String(urlsConfig.CORE_CLIENT_URL),
    icanWalletUrl: String(urlsConfig.ICAN_WALLET_URL),
    githubReleaseDownloadUrl: String(urlsConfig.GITHUB_RELEASE_DOWNLOAD_URL),
    githubRawMineSh: String(urlsConfig.GITHUB_RAW_MINE_SH),
    startMiningPoolConfigurations,
  };
};

export { useControls };
