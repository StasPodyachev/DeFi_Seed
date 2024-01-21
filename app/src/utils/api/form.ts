import { TokensApi, AvailableTokensApi } from '@models/api';
import { PositionTokenValues, PositionForm, PoolTokenValues, PoolForm } from '@models/form';
import { getStaticAssetPath } from '@utils';
import { EXCHANGERS } from '@constants/dictionaries';
import { getNumbersAfterComma, isAvailableCurve, isAvailableOneInch, getTokenSymbol } from './handlers';

const getAvailableTokensValues = (
  raw: AvailableTokensApi,
  chainId: number,
): Array<Omit<PositionTokenValues, 'availableTokens'>> =>
  raw.map((item) => {
    const tokenSymbol = getTokenSymbol(item.symbol, item.id, chainId);

    return {
      name: tokenSymbol,
      value: tokenSymbol,
      symbol: tokenSymbol,
      address: item.id,
      iconUrl: getStaticAssetPath(`${tokenSymbol}.svg`, 'images/tokens'),
      decimals: +item.decimals,
      numbersAfterComma: getNumbersAfterComma(tokenSymbol),
      isAvailableCurve: isAvailableCurve(tokenSymbol),
      isAvailableOneInch: isAvailableOneInch(tokenSymbol),
    };
  });

export const getPositionTokensValues = (raw: TokensApi, chainId: number): Array<PositionTokenValues> =>
  raw.map((item) => {
    const tokenSymbol = getTokenSymbol(item.token.symbol, item.token.id, chainId);

    return {
      name: tokenSymbol,
      value: tokenSymbol,
      symbol: tokenSymbol,
      address: item.token.id,
      iconUrl: getStaticAssetPath(`${tokenSymbol}.svg`, 'images/tokens'),
      decimals: +item.token.decimals,
      numbersAfterComma: getNumbersAfterComma(tokenSymbol),
      isAvailableCurve: isAvailableCurve(tokenSymbol),
      isAvailableOneInch: isAvailableOneInch(tokenSymbol),
      availableTokens: getAvailableTokensValues(item.availableTokens, chainId),
    };
  });

export const getPositionCurveTokensValues = (data: Array<PositionTokenValues>): Array<PositionTokenValues> =>
  data
    .filter((item) => item.isAvailableCurve)
    .map((item) => ({ ...item, availableTokens: item.availableTokens.filter((at) => at.isAvailableCurve) }));

export const getPositionOneInchTokensValues = (data: Array<PositionTokenValues>): Array<PositionTokenValues> =>
  data
    .filter((item) => item.isAvailableOneInch)
    .map((item) => ({ ...item, availableTokens: item.availableTokens.filter((at) => at.isAvailableOneInch) }));

export const getInitialPositionFormValues = (tokens: Array<PositionTokenValues>): PositionForm => {
  const tokenSell = tokens.find((token) => token.value === 'GHO') as PositionTokenValues;
  const tokenBuy = tokens.find((token) => token.value === 'WETH') as PositionTokenValues;

  return {
    exchange: EXCHANGERS[0],
    leverage: 10,
    approvedAmount: 0,
    marketRate: 0,
    marginCall: 0,
    isApprovedTokens: false,
    isConfirmed: false,
    isUpdateApprovedAmount: false,
    tokenSell: {
      ...tokenSell,
      amount: 10,
      amountStr: '10',
    },
    tokenBuy: {
      ...tokenBuy,
      amount: 0,
      amountRaw: '',
    },
    path: '0x',
  };
};

export const getPoolTokensValues = (raw: TokensApi, chainId: number): Array<PoolTokenValues> =>
  raw.map((item) => {
    const tokenSymbol = getTokenSymbol(item.token.symbol, item.token.id, chainId);

    return {
      value: tokenSymbol,
      name: tokenSymbol,
      iconUrl: getStaticAssetPath(`${tokenSymbol}.svg`, 'images/tokens'),
      alpAddress: item.id,
      alpSymbol: item.name,
      address: item.token.id,
      symbol: tokenSymbol,
      decimals: +item.token.decimals,
    };
  });

export const getInitialPoolFormValues = (tokens: Array<PoolTokenValues>): PoolForm => {
  const initToken = tokens.find((token) => token.value === 'GHO') as PoolTokenValues;

  return {
    ...initToken,
    amount: 100,
    amountStr: '100',
    isApprovedTokens: false,
    approvedAmount: 0,
    isUpdateApprovedAmount: false,
    isConfirmedDeposit: false,
    isConfirmedWithdraw: false,
  };
};
