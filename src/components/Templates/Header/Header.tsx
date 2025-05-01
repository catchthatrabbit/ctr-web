import React from 'react';
import { Dropdown } from '@site/src/components/Atoms/Dropdown';
import { Board } from '@site/src/components/Atoms/Board';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { IBan } from '@site/src/components/Molecules/IBan';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';

import clsx from 'clsx';

import styles from './styles.module.css';

interface IHeader {
  items?: Array<{ label: string; value: string }>;
  defaultRegion?: string;
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
  addComponent?: React.ReactNode;
  layout?: {
    search: boolean;
    dropdown: boolean;
    boards: boolean;
  };
  context?: string;
}

const Header = ({
  items,

  boardItems,
  onChangeRegion,
  defaultRegion,
  iban,
  children,
  isLoading = false,
  pageTitleComponent,
  addComponent,
  layout = { boards: true, dropdown: true, search: true },
  context,
}: IHeader) => {
  const { desktop } = useMediaQueries();

  const columnClass = clsx({
    'flex-col--4': context === 'blocks' || context === 'payments',
    'flex-col--6': context === 'wallet',
    'flex-col--12': context === 'mobileWallet',
  });
  const renderDropdown = () => (
    <div
      className={clsx('flex flex-column flex-column-center', columnClass, {
        [styles.blocksDropdown]: context === 'blocks',
      })}
    >
      <Dropdown
        isLoading={isLoading}
        defaultValue={defaultRegion}
        className={clsx(styles.boardDropdown, {
          [styles.smallWidth]: context === 'blocks' || context === 'payments',
        })}
        items={items}
        onChange={onChangeRegion}
        text="Mining pool"
        context={context}
      />
    </div>
  );

  const renderBoards = () => (
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
  );

  return (
    <>
      {pageTitleComponent}
      {layout.search && (
        <>
          {context === 'mobileWallet' ? null : <Spacer variant="xl" />}
          <div className="col col--12"></div>
        </>
      )}
      {layout.dropdown && (
        <>
          {iban && <IBan iBan={iban} />}
          {desktop ? null : <Spacer variant="xxs" />}

          {context === 'blocks' && <Spacer variant="xxl" />}
          {context === 'payments' && <Spacer variant="xs" />}
          {context === 'mobileWallet' && <Spacer variant="xs" />}
          {context === 'wallet' && <Spacer variant="sm" />}
          <div
            className={clsx('flex', {
              [styles.blocksContainer]: context === 'blocks',
              [styles.paymentsContainer]: context === 'payments',
              [styles.mobileBlocksContainer]: context === 'mobileWallet',
              'xl-center-items': context === 'wallet',
            })}
          >
            {renderDropdown()}
            {addComponent}
          </div>
        </>
      )}
      {context !== 'payments' && desktop && <Spacer variant="xl" />}

      {layout.boards && (
        <>
          {desktop ? <Spacer variant="lg" /> : <Spacer variant="sm" />}
          {renderBoards()}
        </>
      )}
      {children}
      {context !== 'blocks' && context !== 'payments' && desktop ? (
        <Spacer variant="md" />
      ) : null}
    </>
  );
};

export default Header;
