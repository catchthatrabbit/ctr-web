import React from "react";
import { Search } from "@site/src/components/Molecules/Search";
import { Dropdown } from "@site/src/components/Atoms/Dropdown";
import { Board } from "@site/src/components/Atoms/Board";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { IBan } from "@site/src/components/Molecules/IBan";
import { Text } from "@site/src/components/Atoms/Text";
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
  tabsComponent?: React.ReactNode;
  layout?: {
    search: boolean;
    dropdown: boolean;
    boards: boolean;
  };
  context?: string;
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
  tabsComponent,
  layout = { boards: true, dropdown: true, search: true },
  context,
}: IHeader) => {
  return (
    <>
      {/* <Spacer variant="xl" /> */}
      {pageTitleComponent}
      {layout.search && (
        <>
          <Spacer variant="xl" />
          <div className="col col--12">
            {/* <Search onSearch={onSearch} /> */}
            {/* insert here start mining today! */}
          </div>
        </>
      )}
      {layout.dropdown && (
        <>
          {iban && <IBan iBan={iban} />}
          <Spacer variant="xxs" />
          {context === "blocks" && <Spacer variant="xl" />}
          <div
            className={clsx("flex", {
              [styles.blocksContainer]: context === "blocks",
            })}
          >
            <div
              className={clsx("flex flex-column flex-column-center", {
                "flex-col--4": context === "blocks",
                "flex-col--12": context !== "blocks",
              })}
            >
              <Text
                variant="subheading"
                color="subheadingColor"
                style={{
                  width: context === "blocks" ? "95%" : "50%",
                  marginBottom: "8px",
                }}
              >
                Mining pool
              </Text>
              <Dropdown
                isLoading={isLoading}
                defaultValue={defaultRegion}
                className={clsx(styles.boardDropdown, {
                  [styles.smallWidth]: context === "blocks",
                })}
                items={items}
                onChange={onChangeRegion}
              />
            </div>
            {tabsComponent}
          </div>
        </>
      )}
      {context === "blocks" ? <Spacer variant="md" /> : <Spacer variant="xl" />}

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
      {context !== "blocks" && <Spacer variant="md" />}
    </>
  );
};

export default Header;
