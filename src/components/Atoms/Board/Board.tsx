import React from 'react';
import { Text } from '@site/src/components/Atoms/Text';
import clsx from 'clsx';
import { useMediaQueries } from '@site/src/hooks/useMediaQueries';

import styles from './styles.module.css';

interface IBoard {
  value: string;
  description: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  loaderComp?: React.ReactNode;
  isLoading?: boolean;
  dir?: 'vert' | 'hor' | 'column';
  context?: 'mapChart' | 'statsChart' | 'payments';
}

const Board: React.FC<IBoard> = ({
  value,
  description = '',
  prefix = '',
  suffix = '',
  className = '',
  loaderComp = <Text variant="subheading">&nbsp;--&nbsp;</Text>,
  isLoading = false,
  dir = 'vert',
  context,
}) => {
  const { mobile } = useMediaQueries();

  const getTextProps = (type: 'value' | 'suffix' | 'description') => {
    const isMapChart = context === 'mapChart' && mobile;
    const isStatsChart = context === 'statsChart';
    const isPayments = context === 'payments';

    switch (type) {
      case 'value':
        return {
          variant: isMapChart
            ? 'tinyBody'
            : isStatsChart || isPayments
              ? 'headingMobile'
              : 'subheading',
          weight: isPayments ? 'bold' : 'normal',
          color: isPayments
            ? 'white'
            : isStatsChart
              ? 'primary'
              : 'valueChartColor',
        };
      case 'suffix':
        return {
          variant: isMapChart
            ? 'tinyBody'
            : isStatsChart
              ? 'headingMobile'
              : 'subheading',
          weight: isPayments ? 'bold' : 'normal',
          color: isStatsChart ? 'primary' : 'valueChartColor',
        };
      case 'description':
        return {
          variant: isMapChart
            ? 'tinyBody'
            : isStatsChart
              ? 'subheading1'
              : 'subheading',
          color: 'subheadingColor',
        };
      default:
        return {};
    }
  };

  return (
    <div
      className={clsx(styles.boardContainer, className, {
        [styles.boardContainerPayments]: context === 'payments',
      })}
    >
      <div
        className={clsx(styles.content, {
          [styles.boardClassNameHor]: dir === 'hor',
          [styles.boardClassNameColumn]: dir === 'column',
          [styles.boardClassNameColumnMobile]: dir === 'column' && mobile,
          [styles.boardTotal]: context === 'payments',
        })}
      >
        <div className={clsx(styles.boardItem, styles.number)}>
          <Text type="zephirum">{prefix}</Text>
          &nbsp;
          {isLoading ? (
            loaderComp
          ) : (
            <Text
              {...getTextProps('value')}
              lineHeight="normalLineHeight"
              letterSpacing="letterSpacing"
              disableMobileStyles
            >
              {value || 'N/D'}
            </Text>
          )}
          <Text
            {...getTextProps('suffix')}
            lineHeight="normalLineHeight"
            letterSpacing="letterSpacing"
          >
            {suffix}
          </Text>
        </div>
        <div className={styles.boardItem}>
          <Text
            {...getTextProps('description')}
            lineHeight="normalLineHeight"
            letterSpacing="letterSpacing"
            disableMobileStyles
          >
            {description}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Board;
