import { FC } from 'react';
import Skeleton from '@mui/material/Skeleton';

import useCurrentRate from '@hooks/useCurrentRate';
import { Position } from '@models/positions';
import { convertBigIntToNumber } from '@utils';
import { SafeText } from '@components';

const PositionCurrentTokenSellContainer: FC<Position> = ({
  tokenSellAddress,
  tokenSellDecimals,
  tokenBuyAmount,
  tokenSellSymbol,
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

  return (
    <SafeText content={`${(tokenBuyRateNow * tokenBuyAmount).toFixed(6)} ${tokenSellSymbol}`} variant="subtitle2" />
  );
};

export default PositionCurrentTokenSellContainer;
