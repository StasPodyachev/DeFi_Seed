import { FC } from 'react';
import Flex from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import useCurrentRate from '@hooks/useCurrentRate';
import { Position } from '@models/positions';
import { convertBigIntToNumber } from '@utils';
import { performMarketRateValue, performROI, performPnl } from '@utils/position';
import { DashboardPositionProfit } from '@components';

const PositionProfitContainer: FC<Position> = ({
  tokenSellAmount,
  tokenSellAddress,
  tokenSellDecimals,
  tokenBuyAmount,
  tokenBuyAddress,
  tokenBuyDecimals,
  leverage,
  exchangeValue,
}): JSX.Element => {
  const { data, isLoading } = useCurrentRate({
    tokenSellAddress,
    tokenBuyAddress,
    tokenBuyDecimals,
    exchangeValue,
  });

  if (isLoading) {
    return (
      <Flex justifyContent="flex-end" flex={1}>
        <Skeleton height={16} width={80} />
      </Flex>
    );
  }

  const tokenBuyRate = performMarketRateValue(tokenSellAmount, tokenBuyAmount, leverage);
  const tokenBuyRateNow = convertBigIntToNumber(data, tokenSellDecimals);
  const roi = performROI(tokenBuyRate, tokenBuyRateNow, leverage);
  const pnl = performPnl(tokenBuyAmount, tokenBuyRate, tokenBuyRateNow);

  return <DashboardPositionProfit roi={roi} pnl={pnl} />;
};

export default PositionProfitContainer;
