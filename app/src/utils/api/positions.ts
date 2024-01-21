import { PositionsAPI } from '@models/api';
import { Positions } from '@models/positions';
import { PositionForm } from '@models/form';
import { POSITIONS_STATUS } from '@constants';
import { EXCHANGERS } from '@constants/dictionaries';
import { convertBigIntToNumber, getStaticAssetPath } from '..';
import { performMarginCallValue as performLiquidationRate } from '../position';
import { getTokenSymbol, convertTimestampToDate } from './handlers';

export const isOpenedPosition = (status: number) => status === POSITIONS_STATUS.OPENED;

export const isClosedPosition = (status: number) => status === POSITIONS_STATUS.CLOSED;

export const isLiquidatedPosition = (status: number) => status === POSITIONS_STATUS.LIQUIDATED;

export const performPositions = (raw: PositionsAPI, chainId: number): Positions =>
  raw
    .map((item) => {
      const tokenSellSymbol = getTokenSymbol(item.tokenSell.symbol, item.tokenSell.id, chainId);
      const tokenBuySymbol = getTokenSymbol(item.tokenBuy.symbol, item.tokenBuy.id, chainId);
      const tokenSellAmount = convertBigIntToNumber(item.amount, +item.tokenSell.decimals);
      const tokenBuyAmount = convertBigIntToNumber(item.amountOut, +item.tokenBuy.decimals);
      const leverage = +item.leverage;
      const entryRate = (tokenSellAmount * leverage) / tokenBuyAmount;

      return {
        id: item.id,
        name: `${tokenSellSymbol}/${tokenBuySymbol}`,
        date: convertTimestampToDate(+item.timestamp),
        leverage,
        tokenSellSymbol,
        tokenSellAmount: +tokenSellAmount.toPrecision(6),
        tokenSellIcon: getStaticAssetPath(`${tokenSellSymbol}.svg`, 'images/tokens'),
        tokenSellAddress: item.tokenSell.id,
        tokenSellDecimals: +item.tokenSell.decimals,
        tokenBuySymbol,
        tokenBuyAmount: +tokenBuyAmount.toPrecision(6),
        tokenBuyIcon: getStaticAssetPath(`${tokenBuySymbol}.svg`, 'images/tokens'),
        tokenBuyAddress: item.tokenBuy.id,
        tokenBuyDecimals: +item.tokenBuy.decimals,
        entryRate: `${entryRate.toFixed(6)} ${tokenSellSymbol} for 1 ${tokenBuySymbol}`,
        liquidationRate: performLiquidationRate(leverage, entryRate).toFixed(6),
        status: item.status,
        openedTxAddress: item.txOpen,
        closedTxAddress: item.txClose,
        liquidatedTxAddress: item.txLiquidation,
        exchangeValue: item.dexType,
      };
    })
    .sort((a, b) => +b.id - +a.id);

export const getOpenedPositions = (list: Positions) => list.filter((item) => isOpenedPosition(item.status));

export const getClosedPositions = (list: Positions) =>
  list.filter((item) => isClosedPosition(item.status) || isLiquidatedPosition(item.status));

export const performApprovedAmountValue = (value: bigint | undefined, decimals: number) => {
  if (!value) return 0;

  return convertBigIntToNumber(value, decimals);
};

// Update if added new chain
export const performPositionRatesResult = (
  raw: any,
  formValues: PositionForm,
): { value: bigint; pathValue: string | null } => {
  const { exchange } = formValues;
  const [uniswap, curve] = EXCHANGERS;

  switch (exchange.value) {
    case uniswap.value:
      if (Array.isArray(raw)) {
        const [value, pathValue] = raw;

        return {
          value,
          pathValue,
        };
      }

      return { value: raw, pathValue: null };
    case curve.value:
      return { value: raw, pathValue: null };
    default:
      return { value: 0n, pathValue: null };
  }
};
