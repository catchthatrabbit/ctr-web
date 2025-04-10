import React from "react";
import { InputHTMLAttributes, forwardRef, useRef, useState } from "react";
import { InputText } from "@site/src/components/Atoms/InputText";
import clsx from "clsx";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";
import { Text } from "../../Atoms/Text";
import SearchIcon from "@site/src/icons/SearchIcon";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.css";

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (searchQuery: string) => void;
  context?: "wallet" | "main" | "startMining" | "payments";
  selectedPool?: string;
  overrideLabel?: boolean;
}

const Search = forwardRef<HTMLInputElement, ISearch>(
  (
    {
      onSearch,
      context = "main",
      selectedPool = "de",
      overrideLabel,
      ...restProps
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { mobile } = useMediaQueries();
    const [walletAddress, setWalletAddress] = useState("");
    const history = useHistory();

    const handleClickSearchButton = () => {
      handleSearch();
    };

    const handleSearch = () => {
      const address = inputRef.current.value;
      setWalletAddress(address);
      if (typeof onSearch === "function") {
        onSearch(address);
      }
      history.push(`/coreid/${address}/${selectedPool}`);
    };

    const placeholderTextMap = {
      wallet: "Wallet Address",
      startMining: "Wallet Address",
      payments: "Wallet Address",
      main: "Search Miners",
    };

    const labelTextMap = {
      wallet: "CorePass Wallet Address",
      startMining: "Wallet Address",
      payments: "Wallet",
      main: "Wallet Address",
    };

    return (
      <div
        className={clsx("row", styles.search, {
          [styles.searchWallet]: context === "wallet",
          [styles.searchStartMining]: context === "startMining",
          [styles.searchPayments]: context === "payments",
          [styles.searchWalletMobile]:
            (context === "wallet" && mobile) ||
            (context === "startMining" && mobile),
        })}
      >
        {context !== "startMining" && (
          <label className={styles.searchLabel}>
            <Text
              lineHeight="smallLineHeight"
              color="subheadingColor"
              variant={mobile ? "smallBody" : "subheading"}
              style={{ direction: "ltr", display: "block" }}
            >
              {overrideLabel
                ? labelTextMap.payments
                : labelTextMap[context] || "Wallet Address"}
            </Text>
          </label>
        )}
        <div
          className={clsx(styles.searchContainer, {
            [styles.searchContainerWalletMobile]:
              context === "wallet" && mobile,
          })}
        >
          <div className={styles.searchIconWrapper}>
            <SearchIcon width={mobile ? 16 : 24} height={mobile ? 16 : 24} />
          </div>
          <InputText
            className={clsx(styles.searchInput, {
              [styles.searchInputMobile]: mobile,
              [styles.searchInputWallet]: context === "wallet",
              [styles.searchInputWalletMobile]:
                (context === "wallet" && mobile) ||
                (context === "startMining" && mobile),
            })}
            placeholder={placeholderTextMap[context] || "Search Miners"}
            ref={ref || inputRef}
            onPressEnter={handleSearch}
            context={context}
            {...restProps}
          />
          <button
            type="button"
            className={clsx(styles.searchButton, {
              [styles.searchButtonMobile]: mobile,
              [styles.searchButtonDesktop]: !mobile,
              [styles.searchButtonWallet]: context === "wallet",
              [styles.searchButtonStartMining]: context === "startMining",
              [styles.searchButtonPayments]: context === "payments",
              [styles.searchButtonWalletMobile]:
                (context === "wallet" && mobile) ||
                (context === "startMining" && mobile),
            })}
            onClick={handleClickSearchButton}
          >
            Search
          </button>
        </div>
      </div>
    );
  },
);

Search.displayName = "Search";

export default Search;
