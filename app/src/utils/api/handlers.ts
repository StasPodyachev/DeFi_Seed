import { AddressType } from '@models';
import {
  NUMBERS_AFTER_COMMA,
  OPTIMISM_GOERLI_CHAI_ID,
  POLYGON_MUMBAI_CHAI_ID,
  OPTIMISM_GOERLI_TOKEN_SYMBOLS,
  POLYGON_MUMBAI_TOKEN_SYMBOLS,
} from '@constants';

export const getNumbersAfterComma = (name: string) => NUMBERS_AFTER_COMMA[name] || 0;

export const isAvailableCurve = (tokenSymbol: string) => ['DAI', 'USDT', 'USDC', 'WETH'].includes(tokenSymbol);

export const isAvailableOneInch = (tokenSymbol: string) =>
  ['DAI', 'USDT', 'USDC', 'WETH', 'EUROC', 'LINK'].includes(tokenSymbol);

// Update if added new chain (only specific tokens)
const getTokenSymbols = (chainId: number) => {
  switch (chainId) {
    case OPTIMISM_GOERLI_CHAI_ID:
      return OPTIMISM_GOERLI_TOKEN_SYMBOLS;
    case POLYGON_MUMBAI_CHAI_ID:
      return POLYGON_MUMBAI_TOKEN_SYMBOLS;
    default:
      return {};
  }
};

export const getTokenSymbol = (symbol: string, address: AddressType, chainId: number) => {
  const tokenSymbols = getTokenSymbols(chainId);

  return tokenSymbols[address] || symbol;
};

export const convertTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
