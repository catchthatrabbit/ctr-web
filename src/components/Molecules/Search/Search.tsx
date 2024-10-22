import { Magnifier } from "@site/src/icons";
import { InputHTMLAttributes, forwardRef, useRef } from "react";
import { InputText } from "@site/src/components/Atoms/InputText";
import clsx from "clsx";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";
import { Text } from "../../Atoms/Text";
import SearchIcon from "@site/src/icons/SearchIcon";

import styles from "./styles.module.css";

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (searchQuery: string) => void;
}

const Search = forwardRef<HTMLInputElement, ISearch>(
  ({ onSearch, ...restProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>();

    const { mobile } = useMediaQueries();

    const handleClickSearchButton = () => {
      handleSearch();
    };

    const handleSearch = () => {
      if (typeof onSearch === "function") onSearch(inputRef.current.value);
    };

    return (
      <div className={clsx("row", styles.search)}>
        <Text lineHeight="smallLineHeight" color="subheadingColor">
          Wallet address
        </Text>
        <InputText
          className={clsx(styles.searchInput, {
            [styles.searchInputMobile]: mobile,
          })}
          placeholder="Search your miners"
          ref={ref || inputRef}
          onPressEnter={handleSearch}
          icon={<SearchIcon />}
          {...restProps}
        />
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
