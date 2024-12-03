import { useHeaders } from "@site/src/hooks/useHeaders";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { START_MINING_POOL_CONFIGURATIONS } from "@site/src/configs/types";

const useControls = ({
  onSetWalletAddress,
  defaultRegion,
  onChangeRegion,
}: IAnyPageAndWallet) => {
  const {
    handleChangeRegion,
    handleSearch,
    region,
    setWalletAddress,
    dropdownItems,
    regionLabel,
  } = useHeaders({ defaultRegion, onSetWalletAddress, onChangeRegion });

  const { siteConfig } = useDocusaurusContext();

  const convertWorkerName = (
    str: string,
  ): { href: string | null; caption: string } => {
    if (!str) return {} as { href: string; caption: string };

    const regex =
      /^_([a-z0-9]+)([A-Z][^\s]*)([A-Z][^\s]*)(?:-([a-zA-Z0-9]+))?$/;
    const match = str.match(regex);

    if (match) {
      const [, username, domainPart, tldPart, workerPart] = match;

      const domain = domainPart.toLowerCase();
      const tld = tldPart.replace(
        /[A-Z]/g,
        (letter) => "." + letter.toLowerCase(),
      );

      const href = `https://${domain}${tld}/@${username}`;
      const caption = workerPart
        ? `@${username}@${domain}${tld} ${workerPart}`
        : `@${username}@${domain}${tld}`;

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
    .START_MINING_POOL_CONFIGURATIONS as START_MINING_POOL_CONFIGURATIONS;

  return {
    handleSearch,
    handleChangeRegion,
    dropdownItems,
    regionLabel,
    convertWorkerName,
    startMiningPoolConfigurations,
  };
};

export default useControls;
