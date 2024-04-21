import { STANDARD_REGIONS_API_KEYS } from "@site/src/Api/types";

export interface IAnyPageAndWallet {
  defaultRegion?: STANDARD_REGIONS_API_KEYS;
  onSetWalletAddress: (walletAddress: string) => void;
  onChangeRegion?: (region: STANDARD_REGIONS_API_KEYS) => void;
}
