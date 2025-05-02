import React, {
  forwardRef,
  useRef,
  useState,
  InputHTMLAttributes,
} from 'react';
import { InputText } from '@site/src/components/Atoms/InputText';
import clsx from 'clsx';
import { useMediaQueries } from '@site/src/hooks/useMediaQueries';
import { Text } from '../../Atoms/Text';
import SearchIcon from '@site/src/icons/SearchIcon';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (searchQuery: string) => void;
  context?: 'wallet' | 'main' | 'startMining' | 'payments';
  selectedPool?: string;
  overrideLabel?: boolean;
  showPool?: boolean;
}

const Search = forwardRef<HTMLInputElement, ISearch>(
  (
    {
      onSearch,
      context = 'main',
      selectedPool = 'de',
      overrideLabel = false,
      showPool = false,
      ...restProps
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { mobile } = useMediaQueries();
    const [walletAddress, setWalletAddress] = useState('');
    const history = useHistory();
    const { siteConfig } = useDocusaurusContext();
    const poolsList = siteConfig.customFields.POOLS_LIST;
    const poolsArray = Object.entries(poolsList).map(([id, pool]) => ({
      id,
      ...pool,
    }));

    const handleSearch = () => {
      const address = inputRef.current?.value || '';
      setWalletAddress(address);
      if (typeof onSearch === 'function') {
        onSearch(address);
      }
      history.push(`/coreid/${address}/${selectedPool}`);
    };

    const handleClickSearchButton = () => {
      handleSearch();
    };

    const findPoolInfo = () => {
      return poolsArray.find(pool => pool.id === selectedPool.toUpperCase());
    };

    const poolInfo = findPoolInfo();
    const poolName = poolInfo ? poolInfo.NAME : '';

    const placeholderTextMap: Record<string, string> = {
      wallet: showPool ? 'Wallet Address' + ' on ' + poolName : 'Wallet Address',
      startMining: showPool ? 'Wallet Address' + ' on ' + poolName : 'Wallet Address',
      payments: showPool ? 'Wallet Address' + ' on ' + poolName : 'Wallet Address',
      main: showPool ? 'Search Miners' + ' on ' + poolName : 'Search Miners',
    };

    const labelTextMap: Record<string, string> = {
      wallet: "Core ID",
      startMining: "Wallet Address",
      payments: "Core ID",
      main: "Core ID",
    };

    return (
      <div
        className={clsx('row', styles.search, {
          [styles.searchWallet]: context === 'wallet',
          [styles.searchStartMining]: context === 'startMining',
          [styles.searchPayments]: context === 'payments',
          [styles.searchWalletMobile]:
            (context === 'wallet' && mobile) ||
            (context === 'startMining' && mobile),
        })}
      >
        {context !== 'startMining' && (
          <label className={styles.searchLabel}>
            <Text
              lineHeight="smallLineHeight"
              color="subheadingColor"
              variant={mobile ? 'smallBody' : 'subheading'}
              style={{ direction: 'ltr', display: 'block' }}
            >
              {overrideLabel
                ? labelTextMap.payments
                : labelTextMap[context] || 'Wallet Address'}
            </Text>
          </label>
        )}
        <div
          className={clsx(styles.searchContainer, {
            [styles.searchContainerWalletMobile]:
              context === 'wallet' && mobile,
          })}
        >
          <div className={styles.searchIconWrapper}>
            <SearchIcon width={mobile ? 16 : 24} height={mobile ? 16 : 24} />
          </div>
          <InputText
            className={clsx(styles.searchInput, {
              [styles.searchInputMobile]: mobile,
              [styles.searchInputWallet]: context === 'wallet',
              [styles.searchInputWalletMobile]:
                (context === 'wallet' && mobile) ||
                (context === 'startMining' && mobile),
            })}
            placeholder={placeholderTextMap[context] || 'Search Miners'}
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
              [styles.searchButtonWallet]: context === 'wallet',
              [styles.searchButtonStartMining]: context === 'startMining',
              [styles.searchButtonPayments]: context === 'payments',
              [styles.searchButtonWalletMobile]:
                (context === 'wallet' && mobile) ||
                (context === 'startMining' && mobile),
            })}
            onClick={handleClickSearchButton}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
);

Search.displayName = 'Search';

export default Search;
