import { FC, memo } from 'react';
import Flex from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const PoolLoader: FC = (): JSX.Element => (
  <Flex gap={2} flexDirection="column">
    <Skeleton height={64} />
    <Flex gap={1}>
      <Skeleton height={48} width="50%" />
      <Skeleton height={48} width="50%" />
    </Flex>
    <Flex gap={1} flexDirection="column">
      <Skeleton height={20} width={100} />
      <Skeleton height={120} />
    </Flex>
    <Flex gap={1} flexDirection="column">
      <Skeleton height={20} width={150} />
      <Skeleton height={72} />
    </Flex>
    <Skeleton height={48} />
    <Flex justifyContent="center">
      <Skeleton height={20} width={200} />
    </Flex>
  </Flex>
);

export default memo(PoolLoader);
