import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IDataTable {
  columns: Array<{
    canBeCopied?: boolean;
    value: string;
    label: string;
    alignToCenter?: boolean;
    isPrimary?: boolean;
    fn?: Dispatch<SetStateAction<unknown>>;
    href?: string;
  }>;
  data: Array<{ [key in string]: ReactNode }>;
  emptyComponent: React.ReactNode;
  isLoading?: boolean;
  loadingComp?: React.ReactNode;
  isWalletPage?: boolean;
  itemsPerPage?: number;
  context?: string;
  hidePagination?: boolean;
}
