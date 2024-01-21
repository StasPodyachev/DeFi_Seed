import { FC } from 'react';

import { Positions } from '@models/positions';
import Tabs from '../../common/tabs/Tabs';
import PositionsList, { PositionsListProps } from './PositionsList';
import OpenPositionButton from './OpenPositionButton';

export type DashboardPositionsProps = {
  chainId: number;
  openedPositions: Positions;
  closedPositions: Positions;
} & Pick<
  PositionsListProps,
  'renderClosePositionButton' | 'renderProfit' | 'renderCurrentRate' | 'renderCurrentTokenSell'
>;

const DashboardPositions: FC<DashboardPositionsProps> = ({
  chainId,
  openedPositions,
  closedPositions,
  renderClosePositionButton,
  renderProfit,
  renderCurrentRate,
  renderCurrentTokenSell,
}): JSX.Element => {
  const tabLabels = [
    {
      label: 'DASHBOARD.POSITIONS.OPENED',
      count: openedPositions.length,
    },
    {
      label: 'DASHBOARD.POSITIONS.CLOSED',
      count: closedPositions.length,
    },
  ];

  const tabElements = [
    <PositionsList
      chainId={chainId}
      list={openedPositions}
      renderProfit={renderProfit}
      renderCurrentRate={renderCurrentRate}
      renderCurrentTokenSell={renderCurrentTokenSell}
      renderClosePositionButton={renderClosePositionButton}
    />,
    <PositionsList chainId={chainId} list={closedPositions} />,
  ];

  return (
    <Tabs title="DASHBOARD.POSITIONS.TITLE" tabLabels={tabLabels} tabElements={tabElements}>
      <OpenPositionButton />
    </Tabs>
  );
};

export default DashboardPositions;
