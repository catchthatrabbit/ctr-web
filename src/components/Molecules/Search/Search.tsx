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
      selectedPool,
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
    const apiEndpoints = siteConfig.customFields.API_ENDPOINTS;
    const apiPath = siteConfig.customFields.API_PATH;

    const poolsList = siteConfig.customFields.POOLS_LIST;
    const poolsArray = Object.entries(poolsList).map(([id, pool]) => ({
      id,
      ...pool,
    }));

    const detectPoolsForWallet = async (walletAddress: string) => {
      try {
        const responses = await Promise.allSettled(
          Object.entries(apiEndpoints).map(async ([poolKey, apiUrl]) => {
            try {
              const apiUrlWithPath = `${apiUrl}/v2/api/accounts/${walletAddress}`;
              const response = await fetch(apiUrlWithPath, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              if (!response.ok) {
                if (response.status === 404) {
                  console.warn(
                    `Endpoint ${poolKey} returned 404: Resource not found.`
                  );
                } else {
                  console.error(
                    `Failed to fetch data from ${poolKey}: ${response.statusText}`
                  );
                }
                return null;
              }

              const data = await response.json();
              const region = poolKey.toLowerCase().split('_')[0];

              return { region, apiUrlWithPath };
            } catch (error) {
              console.error(`Error fetching data from ${poolKey}:`, error);
              return null;
            }
          })
        );

        const successfulPools = responses
          .filter(
            (result) => result.status === 'fulfilled' && result.value !== null
          )
          .map((result) => (result as PromiseFulfilledResult<any>).value);

        return successfulPools;
      } catch (error) {
        console.error('Error fetching data from APIs:', error);
        return [];
      }
    };
    const handleSearch = async () => {
      const address = inputRef.current?.value || '';
      setWalletAddress(address);

      if (typeof onSearch === 'function') {
        onSearch(address);
      }

      if (selectedPool !== 'undefined') {
        history.push(`/coreid/${address}/${selectedPool}`);
      } else {
        const pools = await detectPoolsForWallet(address);

        if (pools.length > 0) {
          if (pools.length === 1) {
            // Navigate to the first pool's route
            const firstPool = pools[0];

            if (firstPool?.region) {
              history.push(`/coreid/${address}/${firstPool.region}`);
            }
          } else if (pools.length > 1) {
            history.push({
              pathname: '/pool-selection',
              state: { pools, walletAddress: address },
            });
          }
        } else {
          console.warn('No matching pools found for wallet address:', address);
          history.push(`/coreid/${address}/de`); // Fallback to default pool to open wallet not found page
        }
      }
    };

    const handleClickSearchButton = () => {
      handleSearch();
    };

    const findPoolInfo = () => {
      if (!selectedPool) {
        console.warn('selectedPool is undefined');
        return null;
      }

      return poolsArray.find((pool) => pool.id === selectedPool.toUpperCase());
    };

    const poolInfo = findPoolInfo();
    const poolName = poolInfo ? poolInfo.NAME : '';

    const placeholderTextMap: Record<string, string> = {
      wallet: showPool
        ? 'Wallet Address' + ' on ' + poolName
        : 'Wallet Address',
      startMining: showPool
        ? 'Wallet Address' + ' on ' + poolName
        : 'Wallet Address',
      payments: showPool
        ? 'Wallet Address' + ' on ' + poolName
        : 'Wallet Address',
      main: showPool ? 'Search Miners' + ' on ' + poolName : 'Search Miners',
    };

    const labelTextMap: Record<string, string> = {
      wallet: 'Core ID',
      startMining: 'Wallet Address',
      payments: 'Core ID',
      main: 'Core ID',
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
