import { AddressType } from '..';

export type PoolApi = {
  id: AddressType;
  name: string;
};

export type PoolsApi = Array<PoolApi>;

export type TokenApi = {
  id: AddressType;
  name: string;
  symbol: string;
  decimals: string;
};

export type PositionAPI = {
  id: string;
  amount: string;
  amountOut: string;
  leverage: string;
  status: number;
  tokenSell: TokenApi;
  tokenBuy: TokenApi;
  txOpen: AddressType | null;
  txClose: AddressType | null;
  txLiquidation: AddressType | null;
  dexType: string;
  timestamp: string;
};

export type PositionsAPI = Array<PositionAPI>;

export type AvailableTokensApi = Array<TokenApi>;

export type TokensApi = Array<{
  id: AddressType;
  name: string;
  isActive: boolean;
  token: TokenApi;
  availableTokens: AvailableTokensApi;
}>;

export type UserBackPayload = {
  email?: string;
  bug_title?: string;
  bug_desc?: string;
  idea_title?: string;
  idea_desc?: string;
  feedback?: string;
  rate?: number;
};
