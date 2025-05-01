import { useHeaders } from "@site/src/hooks/useHeaders";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { POOLS_LIST } from "@site/src/configs/types";
import useMapChartData from "../Dashboard/hooks/useMapChartData";

const useControls = ({
  onSetWalletAddress,
  defaultRegion,
  onChangeRegion,
}: IAnyPageAndWallet) => {
  const { siteConfig } = useDocusaurusContext();
  const { handleChangeRegion, handleSearch, dropdownItems, regionLabel } =
    useHeaders({ defaultRegion, onSetWalletAddress, onChangeRegion });
  const mapChartData = useMapChartData();

  const convertWorkerName = (
    str: string
  ): { href: string | null; caption: string } => {
    if (!str) return {} as { href: string; caption: string };

    const regex = /^_([a-z0-9]+)([a-z0-9]+)\.([a-z]+)(?:-([a-zA-Z0-9]+))?$/;
    const match = str.match(regex);

    if (match) {
      const [, username, domainPart, tldPart, workerPart] = match;

      const domain = domainPart.toLowerCase();
      const tld =
        tldPart.charAt(0).toUpperCase() + tldPart.slice(1).toLowerCase();

      const href = `https://${domain}${tld}/@${username}`;
      const caption = workerPart
        ? `_${username}${domain}${tld}-${workerPart}`
        : `_${username}${domain}${tld}`;
      return {
        href,
        caption,
      };
    } else {
      return {
        href: null,
        caption: str,
      };
    }
  };

  const startMiningPoolConfigurations = siteConfig.customFields
    .POOLS_LIST as POOLS_LIST;

  return {
    handleSearch,
    handleChangeRegion,
    dropdownItems,
    regionLabel,
    convertWorkerName,
    startMiningPoolConfigurations,
    infoBoxMapData: mapChartData.infoBoxItems,
    poolFee: mapChartData.poolFee,
    isLoadingMapChart: mapChartData.isLoading,
  };
};

export default useControls;
