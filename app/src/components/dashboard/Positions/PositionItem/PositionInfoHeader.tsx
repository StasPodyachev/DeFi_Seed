import { FC, ReactNode } from 'react';
import Image from 'next/image';
import Flex from '@mui/material/Stack';
import styled from '@emotion/styled';

import theme from '@theme';
import { Position } from '@models/positions';
import { isLiquidatedPosition } from '@utils/api/positions';
import SafeText from '../../../common/text/SafeText';
import LiquidatedLabel from '../../../common/labels/LiquidatedLabel';

const IconsWrap = styled(Flex)({
  '& :last-child': {
    marginLeft: theme.spacing(-1.5),
  },
});

export type PositionInfoHeaderProps = {
  renderProfit?: ((position: Position) => ReactNode) | undefined;
} & Position;

const PositionInfoHeader: FC<PositionInfoHeaderProps> = ({ renderProfit, ...props }): JSX.Element => {
  const { name, leverage, tokenSellSymbol, tokenSellAmount, tokenSellIcon, tokenBuySymbol, tokenBuyIcon, status } =
    props;

  return (
    <Flex gap={1} padding={theme.spacing(2, 1)} width="100%">
      <IconsWrap alignItems="center">
        <Image src={tokenSellIcon} width={32} height={32} alt={tokenSellSymbol} />
        <Image src={tokenBuyIcon} width={32} height={32} alt={tokenBuySymbol} />
      </IconsWrap>
      <Flex gap={0.5} flexDirection="column" width="inherit">
        <Flex gap={1} alignItems="baseline">
          <SafeText content={name} />
          <SafeText content={`x${leverage}`} color={theme.palette.secondary.light} />
          {renderProfit?.(props)}
        </Flex>
        <Flex justifyContent="space-between">
          <SafeText content={`${tokenSellAmount} ${tokenSellSymbol}`} variant="body1" />
          {isLiquidatedPosition(status) && <LiquidatedLabel />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PositionInfoHeader;
