import { memo, FC } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import Flex from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import theme from '@theme';
import Label from '../controls/Label';
import Text from '../common/text/Text';
import SafeText from '../common/text/SafeText';

const Wrap = styled(Flex)({
  minHeight: 64,
  padding: theme.spacing(2, 2.5),
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
});

type MarketRateProps = {
  icon: string;
  value: number;
  tokenSellSymbol: string;
  tokenBuySymbol: string;
  isLoading?: boolean;
};

const MarketRate: FC<MarketRateProps> = ({ icon, value, tokenSellSymbol, tokenBuySymbol, isLoading }): JSX.Element => (
  <Flex gap={1} flexDirection="column">
    <Label label="POSITION.OPEN.MARKET_RATE" tooltip="POSITION.OPEN.MARKET_RATE_TOOLTIP" />
    <Wrap gap={1} alignItems="center">
      <Image src={icon} width={24} height={24} alt={tokenSellSymbol} />
      {isLoading && <Skeleton width={150} height={32} />}
      {!isLoading && <SafeText content={`${value}`} variant="h5" fontWeight={600} />}
      <Text
        tid="POSITION.OPEN.MARKET_RATE_TOKENS"
        values={{ tokenSellSymbol, tokenBuySymbol }}
        variant="subtitle2"
        color={theme.palette.grey[400]}
        flex={1}
        align="right"
      />
    </Wrap>
  </Flex>
);

export default memo(MarketRate);
