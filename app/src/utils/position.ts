import UNISWAP_RATE_ABI from '@contracts/abi/UniswapExchange.json';
import CURVE_RATE_ABI from '@contracts/abi/CurveExchange.json';
import { PositionForm } from '@models/form';
import { Addresses } from '@models';
import { EXCHANGERS } from '@constants/dictionaries';
import { LIQUIDATION_DELTA_PERCENT } from '@constants';
import { convertNumberToBigInt } from '.';

// Update if added new chain
export const prepareMarketRateContractConfig = (formValues: PositionForm, addresses: Addresses) => {
  const { exchange, leverage, tokenSell, tokenBuy } = formValues;
  const [uniswap, curve] = EXCHANGERS;
  const amountIn = convertNumberToBigInt(tokenSell.amount * leverage, tokenSell.decimals);
  const config = {
    args: [tokenSell.address, tokenBuy.address, amountIn],
  };

  switch (exchange.value) {
    case uniswap.value:
      return {
        ...config,
        functionName: 'getBestRoute',
        address: addresses?.UniswapExchange,
        abi: UNISWAP_RATE_ABI,
      };
    case curve.value:
      return {
        ...config,
        functionName: 'getAmountOut',
        address: addresses?.CurveExchange,
        abi: CURVE_RATE_ABI,
      };
    default:
      return {};
  }
};

export const performMarketRateValue = (tokenSellAmount: number, tokenBuyAmount: number, leverage: number) =>
  tokenBuyAmount === 0 ? 0 : (tokenSellAmount * leverage) / tokenBuyAmount;

export const performMarginCallValue = (leverage: number, marketRate: number) =>
  (marketRate * (leverage - 1 + LIQUIDATION_DELTA_PERCENT)) / leverage;

export const performROI = (costBuy: number, costNow: number, leverage: number = 1) =>
  ((costNow - costBuy) / costBuy) * 100 * leverage;

export const performPnl = (amount: number, costBuy: number, costNow: number) => costNow * amount - costBuy * amount;
