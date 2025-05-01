import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { POOLS_LIST } from "@site/src/configs/types";

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();
  const startMiningPoolConfigurations = siteConfig.customFields
    .POOLS_LIST as POOLS_LIST;

  return {
    startMiningPoolConfigurations,
  };
};

export default useControls;
