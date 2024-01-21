import { FC } from 'react';

import TransactionBanner, { TransactionBannerProps } from './TransactionBanner';

export type WaitingPositionsProps = Omit<TransactionBannerProps, 'title'>;

const WaitingPositions: FC<WaitingPositionsProps> = (props): JSX.Element => (
  <TransactionBanner title="DASHBOARD.WAITING_POSITIONS" {...props} />
);

export default WaitingPositions;
