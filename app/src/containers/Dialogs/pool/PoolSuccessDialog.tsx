import React, { Fragment, FC } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Flex from '@mui/material/Stack';

import useTypedSelector from '@hooks/useTypedSelector';
import { AddressType } from '@models';
import { DialogTitle, ExplorerLink, ValuesList, Button } from '@components';
import MetamaskButtonContainer, { MetamaskButtonContainerProps } from '../../MetamaskButton';

const TITLE = {
  deposit: 'POOL.SUCCESS.DEPOSIT',
  withdraw: 'POOL.SUCCESS.WITHDRAW',
};

type PositionSuccessDialogProps = {
  data: {
    variant: 'deposit' | 'withdraw';
    txAddress?: AddressType;
    MetamaskButtonProps?: MetamaskButtonContainerProps;
  };
  onClose: () => void;
};

const PoolSuccessDialog: FC<PositionSuccessDialogProps> = ({ data, onClose }): JSX.Element => {
  const { chainId } = useTypedSelector((state) => state.user);
  const { depositPoolData, withdrawPoolData } = useTypedSelector((state) => state.transactions);
  const { variant, txAddress, MetamaskButtonProps } = data;
  let amount = 0;
  let symbol = '';

  switch (variant) {
    case 'deposit':
      amount = depositPoolData.amount;
      symbol = depositPoolData.symbol;
      break;
    case 'withdraw':
      amount = withdrawPoolData.amount;
      symbol = withdrawPoolData.symbol;
      break;
  }

  const valuesList = [
    {
      id: '01',
      title: 'POOL.TOTAL',
      value: 'POOL.TOTAL_VALUE',
      vValues: { amount, symbol },
    },
  ];

  return (
    <Fragment>
      <DialogTitle title="POOL.SUCCESS.TITLE" onClose={onClose} />
      <DialogContent>
        <Flex gap={2} flexDirection="column" alignItems="center" width="100%">
          {txAddress && chainId && <ExplorerLink address={txAddress} chainId={chainId} />}
          <ValuesList title={TITLE[variant]} tValues={{ symbol }} list={valuesList} />
        </Flex>
      </DialogContent>
      <DialogActions>
        <Flex gap={2} flexDirection="column" alignItems="center" maxWidth={200} width="100%">
          {MetamaskButtonProps && <MetamaskButtonContainer {...MetamaskButtonProps} fullWidth />}
          <Button title="COMMON.OK" width="200px" onClick={onClose} />
        </Flex>
      </DialogActions>
    </Fragment>
  );
};

export default PoolSuccessDialog;
