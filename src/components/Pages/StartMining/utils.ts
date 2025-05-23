import { SETTINGS_RESPONSE } from '@site/src/Api/settings/types';
import { UNITS } from '@site/src/constants/units';

export const convertSettingsResponse2SettingsInfo = (
  settingsResponse: SETTINGS_RESPONSE
): Array<{ key: string; title: string; value: string | number }> => {
  if (!settingsResponse) return [];

  return [
    {
      key: '1',
      title: 'Reward scheme',
      value: 'PPLNS (Pay Per Last N Shares)',
    },
    { key: '2', title: 'Pool fee', value: settingsResponse.PoolFee + ' %' },
    {
      key: '3',
      title: 'Payout threshold',
      value: '₡' + (settingsResponse.PayoutThreshold / UNITS.NUCLE).toString(),
    },
    { key: '4', title: 'Mining algorithm', value: 'RandomY' },
  ];
};
