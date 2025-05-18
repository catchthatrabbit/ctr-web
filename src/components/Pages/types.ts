export interface IAnyPageAndWallet {
  defaultRegion?: string;
  onSetWalletAddress: (walletAddress: string) => void;
  onChangeRegion?: (region: string) => void;
  selectedPool?: string;
}
