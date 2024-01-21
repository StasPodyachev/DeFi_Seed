import { FC, memo } from 'react';
import Flex from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const OpenPositionLoader: FC = (): JSX.Element => (
  <Flex gap={2} flexDirection="column">
    <Skeleton height={64} />
    <Flex gap={1} flexDirection="column">
      <Skeleton height={20} width={200} />
      <Flex gap={1} justifyContent="space-between">
        <Skeleton height={32} width={40} />
        <Skeleton height={32} width={40} />
        <Skeleton height={32} width={40} />
        <Skeleton height={32} width={40} />
        <Skeleton height={32} width={40} />
        <Skeleton height={32} width={40} />
      </Flex>
    </Flex>
    <Flex gap={1} flexDirection="column">
      <Skeleton height={64} />
      <Skeleton height={64} />
    </Flex>
    <Flex gap={1} flexDirection="column">
      <Skeleton height={20} width={130} />
      <Skeleton height={64} />
    </Flex>
    <Skeleton height={20} />
    <Flex gap={1}>
      <Skeleton height={48} width="50%" />
      <Skeleton height={48} width="50%" />
    </Flex>
    <Flex justifyContent="center">
      <Skeleton height={20} width={200} />
    </Flex>
  </Flex>
);

export default memo(OpenPositionLoader);
