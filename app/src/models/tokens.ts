import { AddressType } from '.';

export type AvailableToken = {
  address: AddressType;
  symbol: string;
  decimals: number;
  iconUrl: string;
};

export type AvailableTokens = Array<AvailableToken>;

export type Token = {
  alpAddress: AddressType;
  alpSymbol: string;
  iconUrl: string;
  symbol: string;
  address: AddressType;
  decimals: number;
  availableTokens: AvailableTokens;
};

export type Tokens = Array<Token>;

export type FaucetToken = {
  status: number;
  symbol?: string;
  loading: boolean;
  hasData: boolean;
  error: string;
};
