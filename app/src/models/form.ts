import { AddressType } from '.';

export type PositionField =
  | 'exchange'
  | 'leverage'
  | 'tokenSell'
  | 'tokenSellAmount'
  | 'tokenBuy'
  | 'tokenBuyAmount'
  | 'tokenBuyAmountRaw'
  | 'marketRate'
  | 'marginCall'
  | 'approvedAmount'
  | 'isUpdateApprovedAmount'
  | 'toggleTokens'
  | 'isConfirmed'
  | 'isLoading'
  | 'path';

export type PositionFieldValue =
  | string
  | number
  | boolean
  | undefined
  | {
      value: string;
      name: string;
      availableTokens?: Array<PositionTokenValues>;
    };

export type PositionTokenValues = {
  name: string;
  value: string;
  symbol: string;
  iconUrl: string;
  address: AddressType;
  decimals: number;
  numbersAfterComma: number;
  isAvailableCurve: boolean;
  isAvailableOneInch: boolean;
  availableTokens: Array<Omit<PositionTokenValues, 'availableTokens'>>;
};

export type PositionForm = {
  exchange: {
    value: string;
    name: string;
    iconUrl?: string;
  };
  leverage: number;
  marketRate: number;
  marginCall: number;
  approvedAmount: number;
  isApprovedTokens: boolean;
  isConfirmed: boolean;
  isUpdateApprovedAmount: boolean;
  tokenSell: PositionTokenValues & { amount: number; amountStr: string };
  tokenBuy: PositionTokenValues & { amount: number; amountRaw: string };
  path: string;
  isLoading?: boolean;
};

export type PoolField =
  | 'token'
  | 'amount'
  | 'approvedAmount'
  | 'isUpdateApprovedAmount'
  | 'isConfirmedDeposit'
  | 'isConfirmedWithdraw';

export type PoolTokenValues = {
  value: string;
  name: string;
  iconUrl: string;
  alpAddress: AddressType;
  alpSymbol: string;
  address: AddressType;
  symbol: string;
  decimals: number;
};

export type PoolFieldValue = string | number | boolean | PoolTokenValues;

export type PoolForm = PoolTokenValues & {
  amount: number;
  amountStr: string;
  approvedAmount: number;
  isUpdateApprovedAmount: boolean;
  isApprovedTokens: boolean;
  isConfirmedDeposit: boolean;
  isConfirmedWithdraw: boolean;
};

export type UserBackField = 'email' | 'title' | 'description' | 'rate';

export type UserBackFieldValue = string | number;

export type BugReportForm = {
  email: string;
  title: string;
  description: string;
  isError: boolean;
};

export type FeatureForm = {
  email: string;
  title: string;
  description: string;
  isError: boolean;
};

export type FeedbackForm = {
  email: string;
  feedback: string;
  rate: number;
  isError: boolean;
};
