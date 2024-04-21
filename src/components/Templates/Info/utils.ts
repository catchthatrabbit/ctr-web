import { WALLET_INFO_RESPONSE } from "@site/src/Api/wallet/types";
import { UNITS } from "@site/src/constants/units";
import { convertNumber2Currency } from "@site/src/utils/convertNumber2Currency";
import { convertTime2Date } from "@site/src/utils/convertTime2Date";

export const convertWalletInfoResponse2GeneralState = (
  data: WALLET_INFO_RESPONSE,
) => {
  if (!data) return null;

  return {
    title: "General stats",
    data: [
      {
        key: "1",
        title: "Immature balance",
        value: convertNumber2Currency(data?.stats?.immature / UNITS.NUCLE),
      },
      {
        key: "2",
        title: "Pending balance",
        value: convertNumber2Currency(data?.stats?.pending / UNITS.NUCLE),
      },
      {
        key: "3",
        title: "Total payments",
        value: data?.paymentsTotal,
      },
      {
        key: "4",
        title: "Total paid",
        value: convertNumber2Currency(data?.stats?.paid / UNITS.NUCLE),
      },
      {
        key: "5",
        title: `Total paid in ${new Date().toLocaleDateString("default", { month: "long", year: "numeric" })}`,
        value: convertNumber2Currency(data?.paidThisMonth / UNITS.NUCLE),
      },
      {
        key: "6",
        title: `Total paid in ${new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleDateString("default", { month: "long", year: "numeric" })}`,
        value: convertNumber2Currency(data?.paidLastMonth / UNITS.NUCLE),
      },
    ],
  };
};

export const convertWalletInfoResponse2ComputingInformation = (
  data: WALLET_INFO_RESPONSE,
) => {
  if (!data) return null;

  return {
    title: "Computing information",
    data: [
      {
        key: "1",
        title: "Workers online",
        value: data?.workersOnline,
      },
      {
        key: "2",
        title: "Hashrate ~30m",
        value: data?.currentHashrate,
      },
      {
        key: "3",
        title: "Hashrate ~3h",
        value: data?.hashrate,
      },
      {
        key: "4",
        title: "Last share",
        value: convertTime2Date(data?.stats?.lastShare),
      },
      {
        key: "5",
        title: "Round share",
        value: data?.roundShares,
      },
      {
        key: "6",
        title: "Blocks found",
        value: data?.stats?.blocksFound ?? 0,
      },
    ],
  };
};
