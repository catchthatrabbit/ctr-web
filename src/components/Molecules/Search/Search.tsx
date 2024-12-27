import { Magnifier } from "@site/src/icons";
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
}

const Search = forwardRef<HTMLInputElement, ISearch>(
  ({ onSearch, context = "main", selectedPool = "de", ...restProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>();
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
      console.log("walletAddress", address);
      history.push(`/coreid/${address}/${selectedPool}`);
    };

    const placeholderTextMap = {
      wallet: "Wallet address",
      startMining: "Wallet address",
      payments: "Wallet address",
      main: "Search your miners",
    };

    const labelTextMap = {
      wallet: "Corepass wallet address",
      startMining: "Wallet address",
      payments: "Wallet",
      main: "Wallet address",
    };

    return (
      <div
        className={clsx("row", styles.search, {
          [styles.searchWallet]: context === "wallet",
          [styles.searchStartMining]: context === "startMining",
          [styles.searchPayments]: context === "payments",
          [styles.searchWalletMobile]: context === "wallet" && mobile,
        })}
      >
        {context !== "startMining" && (
          <Text
            lineHeight="smallLineHeight"
            color="subheadingColor"
            variant={mobile ? "smallBody" : "subheading"}
            // className={clsx({ [styles.mobilePaddingLeft]: mobile })}
          >
            {labelTextMap[context] || "Wallet address"}
          </Text>
        )}
        <div
          className={clsx(styles.searchContainer, {
            [styles.searchContainerWalletMobile]:
              context === "wallet" && mobile,
          })}
        >
          <InputText
            className={clsx(styles.searchInput, {
              [styles.searchInputMobile]: mobile,
              [styles.searchWallet]: context === "wallet",
              [styles.searchInputWalletMobile]: context === "wallet" && mobile,
            })}
            placeholder={placeholderTextMap[context] || "Search your miners"}
            ref={ref || inputRef}
            onPressEnter={handleSearch}
            icon={
              <SearchIcon width={mobile ? 16 : 24} height={mobile ? 16 : 24} />
            }
            context={context}
            {...restProps}
          />
        </div>
        <button
          className={clsx(styles.searchButton, {
            [styles.searchButtonMobile]: mobile,
            [styles.searchButtonDesktop]: !mobile,
            [styles.searchButtonWalletMobile]: context === "wallet" && mobile,
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
