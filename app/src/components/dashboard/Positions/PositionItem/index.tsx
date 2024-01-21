import { FC, ReactNode } from 'react';

import { Position } from '@models/positions';
import SimpleTabs from '../../../common/tabs/SimpleTabs';
import DetailsCollapsable from '../../../section/DetailsCollapsable';
import PositionInfoHeader, { PositionInfoHeaderProps } from './PositionInfoHeader';
import Information, { PositionInformationProps } from './Information';
import Etherscan from './Etherscan';

export type PositionItemProps = {
  chainId: number;
  renderClosePositionButton?: ((position: Position) => ReactNode) | undefined;
} & Position &
  Pick<PositionInfoHeaderProps, 'renderProfit'> &
  Pick<PositionInformationProps, 'renderCurrentRate' | 'renderCurrentTokenSell'>;

const DashboardPositionItem: FC<PositionItemProps> = ({ renderClosePositionButton, ...props }): JSX.Element => {
  const tabLabels = ['DASHBOARD.POSITIONS.INFORMATION', 'DASHBOARD.POSITIONS.ETHERSCAN'];
  const tabElements: Array<JSX.Element | ReactNode> = [<Information {...props} />, <Etherscan {...props} />];

  if (renderClosePositionButton) {
    tabLabels.push('DASHBOARD.POSITIONS.ACTION');
    tabElements.push(renderClosePositionButton(props));
  }

  return (
    <DetailsCollapsable title={<PositionInfoHeader {...props} />}>
      <SimpleTabs tabLabels={tabLabels} tabElements={tabElements} />
    </DetailsCollapsable>
  );
};

export default DashboardPositionItem;
