import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { START_MINING_POOL_CONFIGURATIONS } from "@site/src/configs/types";

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();
  const startMiningPoolConfigurations = siteConfig.customFields
    .START_MINING_POOL_CONFIGURATIONS as START_MINING_POOL_CONFIGURATIONS;

  return {
    startMiningPoolConfigurations,
  };
};

export default useControls;
