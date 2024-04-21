import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IDataTable {
  columns: Array<{
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
}
