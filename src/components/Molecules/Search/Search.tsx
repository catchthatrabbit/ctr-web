import { Magnifier } from "@site/src/icons";
import { InputHTMLAttributes, forwardRef, useRef } from "react";
import { InputText } from "@site/src/components/Atoms/InputText";
import clsx from "clsx";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";
import { Text } from "../../Atoms/Text";
import SearchIcon from "@site/src/icons/SearchIcon";

import styles from "./styles.module.css"; // Ensure this import is correct

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (searchQuery: string) => void;
  context?: "wallet" | "main" | "startMining" | "payments";
}

const Search = forwardRef<HTMLInputElement, ISearch>(
  ({ onSearch, context = "main", ...restProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>();

    const { mobile } = useMediaQueries();

    const handleClickSearchButton = () => {
      handleSearch();
    };

    const handleSearch = () => {
      if (typeof onSearch === "function") {
        onSearch(inputRef.current.value);
      }
    };

    return (
      <div
        className={clsx("row", styles.search, {
          [styles.searchWallet]: context === "wallet",
          [styles.searchStartMining]: context === "startMining",
          [styles.searchPayments]: context === "payments",
        })}
      >
        {context !== "startMining" && (
          <Text lineHeight="smallLineHeight" color="subheadingColor">
            {context === "wallet"
              ? "Corepass wallet address"
              : "Wallet address"}
          </Text>
        )}
        <div className={styles.searchContainer}>
          <InputText
            className={clsx(styles.searchInput, {
              [styles.searchInputMobile]: mobile,
              [styles.searchWallet]: context === "wallet",
            })}
            placeholder={
              context === "wallet" || context === "startMining"
                ? "Wallet address"
                : "Search your miners"
            }
            ref={ref || inputRef}
            onPressEnter={handleSearch}
            icon={<SearchIcon />}
            {...restProps}
          />
        </div>
        <button
          className={clsx(styles.searchButton, {
            [styles.searchButtonMobile]: mobile,
            [styles.searchButtonDesktop]: !mobile,
          })}
          onClick={handleClickSearchButton}
        >
          Search
        </button>
      </div>
    );
  },
);

Search.displayName = "Search";

export default Search;
