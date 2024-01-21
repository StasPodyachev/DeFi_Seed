import { FC } from 'react';
import Image from 'next/image';
import Flex from '@mui/material/Stack';

import theme from '@theme';
import { Pool } from '@models/pools';
import Text from '../common/text/Text';
import SafeText from '../common/text/SafeText';

const DashboardPoolBalance: FC<Pool> = ({ name, iconUrl, symbol, amount }): JSX.Element => (
  <Flex gap={1} justifyContent="space-between" alignItems="center">
    <Flex gap={1} alignItems="center">
      <Image src={iconUrl} width={24} height={24} alt={name} />
      <Text tid="DASHBOARD.MY_POOLS_NAME" values={{ name }} variant="body1" fontWeight={600} />
    </Flex>
    <Flex gap={1}>
      <SafeText content={`${amount}`} variant="body1" />
      <SafeText content={symbol} variant="body1" color={theme.palette.grey[400]} minWidth={64} textAlign="right" />
    </Flex>
  </Flex>
);

export default DashboardPoolBalance;
