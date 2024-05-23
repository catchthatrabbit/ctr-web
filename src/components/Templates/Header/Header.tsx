import React from "react";
import { Search } from "@site/src/components/Molecules/Search";
import { Dropdown } from "@site/src/components/Atoms/Dropdown";
import { Board } from "@site/src/components/Atoms/Board";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { IBan } from "@site/src/components/Molecules/IBan";
import clsx from "clsx";

import styles from "./styles.module.css";

interface IHeader {
  items?: Array<{ label: string; value: string }>;
  defaultRegion?: string;
  onSearch?: (searchQuery: string) => void;
  children?: React.ReactNode;
  iban?: string;
  isLoading?: boolean;
  boardItems?: Array<{
    desc: string;
    value: string;
    prefix: string;
    suffix: string;
  }>;
  onChangeRegion?: (id: unknown) => void;
  pageTitleComponent?: React.ReactNode;
  layout?: {
    search: boolean;
    dropdown: boolean;
    boards: boolean;
  };
}

const Header = ({
  items,
  onSearch,
  boardItems,
  onChangeRegion,
  defaultRegion,
  iban,
  children,
  isLoading = false,
  pageTitleComponent,
  layout = { boards: true, dropdown: true, search: true },
}: IHeader) => {
  return (
    <>
      <Spacer variant="xl" />
      {pageTitleComponent}
      {layout.search && (
        <>
          <Spacer variant="xl" />
          <div className="col col--12">
            <Search onSearch={onSearch} />
          </div>
        </>
      )}
      {layout.dropdown && (
        <>
          <Spacer variant="xl" />
          <div className="flex flex-col--12">
            <Dropdown
              isLoading={isLoading}
              defaultValue={defaultRegion}
              className={styles.boardDropdown}
              items={items}
              onChange={onChangeRegion}
            />
          </div>
        </>
      )}
      <Spacer variant="xl" />
      {iban && <IBan iBan={iban} />}
      {layout.boards && (
        <>
          <Spacer variant="lg" />
          <div className={clsx(styles.boardRoot, styles.boardJustifyCenter)}>
            {boardItems?.map((boardItem, index) => (
              <Board
                isLoading={isLoading}
                key={index}
                description={boardItem.desc}
                value={boardItem.value}
                suffix={boardItem.suffix}
                prefix={boardItem.prefix}
              />
            ))}
          </div>
        </>
      )}
      {children}
      <Spacer variant="md" />
    </>
  );
};

export default Header;
