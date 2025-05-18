import React from 'react';
import { WALLET_INFO_RESPONSE } from '@site/src/Api/wallet/types';
import { UNITS } from '@site/src/constants/units';
import { convert2Rank } from '@site/src/utils/rank';
import { convertNumber2Currency } from '@site/src/utils/convertNumber2Currency';
import { convertTime2Date } from '@site/src/utils/convertTime2Date';
import { profitabilityCalculation } from '@site/src/utils/profitabilityCalculation';
import { TextFormat } from '@site/src/utils/textFormat';
import { DocusaurusContext } from '@docusaurus/types';

export const convertWalletInfoResponse2GeneralState = (
  data: WALLET_INFO_RESPONSE
) => {
  if (!data) return null;

  return {
    title: 'General stats',
    data: [
      {
        key: '1',
        title: 'Round rank',
        value: convert2Rank(data?.stats?.immature / UNITS.NUCLE),
      },
      {
        key: '2',
        title: 'Immature balance',
        value: convertNumber2Currency(data?.stats?.immature / UNITS.NUCLE),
      },
      {
        key: '3',
        title: 'Pending balance',
        value: convertNumber2Currency(data?.stats?.pending / UNITS.NUCLE),
      },
      {
        key: '4',
        title: 'Total payments',
        value: data?.paymentsTotal,
      },
      {
        key: '5',
        title: 'Total paid',
        value: convertNumber2Currency(data?.stats?.paid / UNITS.NUCLE),
      },
      {
        key: '6',
        title: `Total paid in ${new Date().toLocaleDateString('default', { month: 'long', year: 'numeric' })}`,
        value: convertNumber2Currency(data?.paidThisMonth / UNITS.NUCLE),
      },
      {
        key: '7',
        title: `Total paid in ${new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleDateString('default', { month: 'long', year: 'numeric' })}`,
        value: convertNumber2Currency(data?.paidLastMonth / UNITS.NUCLE),
      },
    ],
  };
};

const calculateProfitability = async (
  hashrate: number,
  siteConfig: DocusaurusContext['siteConfig']
) => {
  try {
    const result = await profitabilityCalculation(
      Number(hashrate),
      siteConfig.customFields,
      'usd',
      'monthly'
    );
    if (result) {
      return result;
    }
  } catch (error) {
    console.error('Error calculating profitability:', error);
  }
};

export const convertWalletInfoResponse2ComputingInformation = (
  data: WALLET_INFO_RESPONSE,
  siteConfig: DocusaurusContext['siteConfig']
) => {
  if (!data) return null;

  const formatHashText = (value: number) => {
    const formatted = TextFormat.getHashText(value || 0, 'h/s');
    return `${formatted.prefix}${formatted.text}${formatted.suffix}`;
  };

  const formatProfitabilityText = async (value: number) => {
    if (value === 0) return 'N/A';
    try {
      const profitability = await calculateProfitability(value, siteConfig);
      if (profitability) {
        const formatted = TextFormat.getProfitabilityText(
          profitability.revenue.toFixed(2),
          null,
          profitability.period,
          true
        );
        return `${formatted.prefix}${formatted.text}${formatted.suffix}`;
      }
      return 'Calculating…';
    } catch (error) {
      console.error('Error calculating profitability:', error);
      return 'Error';
    }
  };

  const formatRoundShareText = (value: number) => {
    const formatted = TextFormat.getPercentText(value || 0);
    return `${formatted.prefix}${formatted.text}${formatted.suffix}`;
  };

  // Start the profitability calculation
  const profitabilityPromise = formatProfitabilityText(data?.hashrate || 0);

  return {
    title: 'Computing Information',
    data: [
      {
        key: '1',
        title: 'Miners online',
        value: data?.workersOnline || 0,
      },
      {
        key: '2',
        title: 'Hashrate ~30m',
        value: formatHashText(data?.currentHashrate),
      },
      {
        key: '3',
        title: 'Hashrate ~3h',
        value: formatHashText(data?.hashrate),
      },
      {
        key: '4',
        title: 'Profitability',
        value: 'Calculating...',
        asyncValue: profitabilityPromise,
      },
      {
        key: '5',
        title: 'Last share',
        value: convertTime2Date(data?.stats?.lastShare) || 'Never',
      },
      {
        key: '6',
        title: 'Round share',
        value: formatRoundShareText(data?.roundShares || 0),
      },
      {
        key: '7',
        title: 'Blocks found',
        value: data?.stats?.blocksFound || 0,
      },
    ],
  };
};
