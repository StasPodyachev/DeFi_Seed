import {
  PositionForm,
  PositionTokenValues,
  PoolForm,
  PoolTokenValues,
  FeedbackForm,
  BugReportForm,
  FeatureForm,
} from './form';
import { Pool } from './pools';
import { Position } from './positions';
import { Tokens, FaucetToken } from './tokens';
import { AddressType, Addresses } from '.';

export type UserState = {
  isUserInit: boolean;
  userAddress: AddressType;
  chainId: number;
  isUserConnected: boolean;
  isWrongNetwork: boolean;
  isTestNet: boolean;
  isMetamask: boolean;
};

export type AddressesState = {
  list: {
    [keys: number]: Addresses;
  };
  loading: boolean;
  hasData: boolean;
  error: string;
};

export type LayoutState = {
  header: {
    active: string;
  };
};

export type DialogState = {
  isOpen: boolean;
  data: object;
};

export type DialogsState = {
  [keys: string]: DialogState;
};

export type FormState = {
  positionForm: PositionForm;
  uniswapTokensValues: Array<PositionTokenValues>;
  curveTokensValues: Array<PositionTokenValues>;
  oneInchTokensValues: Array<PositionTokenValues>;
  poolForm: PoolForm;
  poolTokensValues: Array<PoolTokenValues>;
  feedbackForm: FeedbackForm;
  bugReportForm: BugReportForm;
  featureForm: FeatureForm;
};

export type PoolsState = {
  list: Array<Pool>;
  loading: boolean;
  hasData: boolean;
  error: string;
  chainId: number;
};

export type PositionsState = {
  openedPositions: Array<Position>;
  closedPositions: Array<Position>;
  loading: boolean;
  hasData: boolean;
  error: string;
  chainId: number;
};

export type TokensState = {
  list: Tokens;
  loading: boolean;
  hasData: boolean;
  error: string;
  chainId: number;
  faucetToken: FaucetToken;
  faucetTokens: {
    [keys: string]: FaucetToken;
  };
};

export type TransactionsState = {
  openPositionTxAddress: AddressType;
  openPositionData: PositionForm;
  closePositionTxAddress: AddressType;
  depositPoolTxAddress: AddressType;
  depositPoolData: PoolForm;
  withdrawPoolTxAddress: AddressType;
  withdrawPoolData: PoolForm;
};
