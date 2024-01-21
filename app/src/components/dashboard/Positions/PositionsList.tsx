import { FC } from 'react';
import Flex from '@mui/material/Stack';

import { Positions } from '@models/positions';
import PositionItem, { PositionItemProps } from './PositionItem';

export type PositionsListProps = {
  chainId: number;
  list: Positions;
} & Pick<
  PositionItemProps,
  'renderClosePositionButton' | 'renderProfit' | 'renderCurrentRate' | 'renderCurrentTokenSell'
>;

const DashboardPositionsList: FC<PositionsListProps> = ({ chainId, list, ...props }): JSX.Element => (
  <Flex gap={2} flexDirection="column">
    {list.map((item) => (
      <PositionItem key={item.id} {...item} chainId={chainId} {...props} />
    ))}
  </Flex>
);

export default DashboardPositionsList;
