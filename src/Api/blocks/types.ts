export type BLOCK = {
  height: number;
  timestamp: number;
  difficulty: number;
  shares: number;
  uncle: boolean;
  uncleHeight: number;
  orphan: boolean;
  hash: string;
  reward: string;
};

export type MATURED_RESPONSE = {
  matured: BLOCK[];
  maturedTotal: number;
};

export type IM_MATURED_RESPONSE = {
  immature: BLOCK[];
  immatureTotal: number;
};

export type CANDIDATES_RESPONSE = {
  candidates: BLOCK[];
  candidatesTotal: number;
};
