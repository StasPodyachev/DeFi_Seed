import { FC, Fragment } from 'react';

import theme from '@theme';
import { Position } from '@models/positions';
import { prepareShortStr, getExplorer } from '@utils';
import ValuesList from '../../../common/ValuesList';
import PositionValue from './PositionValue';

type PositionEtherscanProps = {
  chainId: number;
} & Position;

const PositionEtherscan: FC<PositionEtherscanProps> = ({
  openedTxAddress,
  closedTxAddress,
  liquidatedTxAddress,
  chainId,
}): JSX.Element => {
  const { link } = getExplorer(chainId);

  if (!link) return <Fragment />;

  const valuesList = [];

  if (openedTxAddress) {
    valuesList.push({
      id: '01',
      title: 'DASHBOARD.POSITIONS.TX_OPENED',
      value: prepareShortStr(openedTxAddress),
      url: link(openedTxAddress, 'tx'),
    });
  }

  if (closedTxAddress) {
    valuesList.push({
      id: '02',
      title: 'DASHBOARD.POSITIONS.TX_CLOSED',
      value: prepareShortStr(closedTxAddress),
      url: link(closedTxAddress, 'tx'),
    });
  }

  if (liquidatedTxAddress) {
    valuesList.push({
      id: '03',
      title: 'DASHBOARD.POSITIONS.TX_LIQUIDATED',
      value: prepareShortStr(liquidatedTxAddress),
      url: link(liquidatedTxAddress, 'tx'),
    });
  }

  return <ValuesList list={valuesList} ItemComponent={PositionValue} background={theme.palette.primary.dark} />;
};

export default PositionEtherscan;
