import { POOLS_API_CONFIG_TYPE } from '@site/src/configs/types';

type NODE = {
  blocktime: string;
  difficulty: string;
  height: string;
  lastBeat: string;
  name: string;
};

type CHART_NODE = {
  x: number;
  y: number;
};

type STATS = {
  lastBlockFound: number;
  nShares: number;
  roundShares?: number;
};

export type STATS_RESPONSE = {
  blockReward: string;
  candidatesTotal: number;
  hashrate: number;
  immatureTotal: number;
  maturedTotal: number;
  minersTotal: number;
  nodes: NODE[];
  now: number;
  stats: STATS;
};

export type STATS_CHARTS_RESPONSE = {
  blockReward: string;
  candidatesTotal: number;
  hashrate: number;
  immatureTotal: number;
  maturedTotal: number;
  minersTotal: number;
  nodes: NODE[];
  now: number;
  poolCharts: CHART_NODE[];
  stats: STATS;
};

export type GET_ALL_PROPS = { urls: POOLS_API_CONFIG_TYPE; apiPath: string };
