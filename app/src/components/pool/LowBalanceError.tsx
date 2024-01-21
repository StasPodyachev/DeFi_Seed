import { FC, ReactNode } from 'react';
import Flex from '@mui/material/Stack';

import theme from '@theme';
import Text from '../common/text/Text';

type PoolLowBalanceErrorProps = {
  balance: number;
  symbol: string;
  children?: ReactNode;
};

const PoolLowBalanceError: FC<PoolLowBalanceErrorProps> = ({ balance, symbol, children }): JSX.Element => (
  <Flex gap={1} flexDirection="column" alignItems="center">
    <Text
      tid="POOL.LOW_BALANCE_ERROR"
      values={{ amount: balance, symbol }}
      variant="body1"
      color={theme.palette.error.main}
      whiteSpace="pre-line"
      align="center"
    />
    {children}
  </Flex>
);

export default PoolLowBalanceError;
