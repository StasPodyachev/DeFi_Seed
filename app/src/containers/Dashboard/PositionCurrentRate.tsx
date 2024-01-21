import { FC } from 'react';
import Skeleton from '@mui/material/Skeleton';

import useCurrentRate from '@hooks/useCurrentRate';
import { Position } from '@models/positions';
import { convertBigIntToNumber } from '@utils';
import { SafeText } from '@components';

const PositionCurrentRateContainer: FC<Position> = ({
  tokenSellAddress,
  tokenSellDecimals,
  tokenBuyAddress,
  tokenBuyDecimals,
  exchangeValue,
}): JSX.Element => {
  const { data, isLoading } = useCurrentRate({
    tokenSellAddress,
    tokenBuyAddress,
    tokenBuyDecimals,
    exchangeValue,
  });

  if (isLoading) {
    return <Skeleton height={16} width={80} />;
  }

  const tokenBuyRateNow = convertBigIntToNumber(data, tokenSellDecimals);

  return <SafeText content={tokenBuyRateNow.toFixed(6)} variant="subtitle2" />;
};

export default PositionCurrentRateContainer;
