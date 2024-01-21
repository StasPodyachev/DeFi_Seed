import { FC } from 'react';

import { AddressType } from '@models';
import TransactionBanner from './TransactionBanner';

const TITLE = {
  openPosition: 'TRANSACTION.PENDING.OPEN_POSITION',
  closePosition: 'TRANSACTION.PENDING.CLOSE_POSITION',
  depositPool: 'TRANSACTION.PENDING.DEPOSIT_POOL',
  withdrawPool: 'TRANSACTION.PENDING.WITHDRAW_POOL',
};

export type PendingTransactionsProps = {
  variant: 'openPosition' | 'closePosition' | 'depositPool' | 'withdrawPool';
  txAddress: AddressType;
  chainId: number;
};

const PendingTransactions: FC<PendingTransactionsProps> = ({ variant, txAddress, chainId }): JSX.Element => (
  <TransactionBanner title={TITLE[variant]} txAddress={txAddress} chainId={chainId} />
);

export default PendingTransactions;
