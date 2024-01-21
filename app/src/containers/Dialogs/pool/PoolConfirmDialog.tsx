import React, { Fragment, FC } from 'react';
import Image from 'next/image';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Flex from '@mui/material/Stack';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { DialogTitle, Text, ValuesList, Button } from '@components';

const TITLE = {
  deposit: 'POOL.CONFIRM.DEPOSIT',
  withdraw: 'POOL.CONFIRM.WITHDRAW',
};

const FIELD = {
  deposit: 'isConfirmedDeposit',
  withdraw: 'isConfirmedWithdraw',
};

type PoolConfirmDialogProps = {
  data: {
    variant: 'deposit' | 'withdraw';
  };
  onClose: () => void;
};

const PoolConfirmDialog: FC<PoolConfirmDialogProps> = ({ data, onClose }): JSX.Element => {
  const { poolForm } = useTypedSelector((state) => state.form);
  const { updatePoolValues } = useActions();
  const { variant } = data;
  const { amount, symbol, iconUrl } = poolForm;

  const valuesList = [
    {
      id: '01',
      title: 'POOL.TOTAL',
      value: 'POOL.TOTAL_VALUE',
      vValues: { amount, symbol },
    },
  ];

  const handleClick = () => {
    const field = FIELD[variant] as 'isConfirmedDeposit' | 'isConfirmedWithdraw'
    updatePoolValues({ field, value: true });
    onClose();
  };

  return (
    <Fragment>
      <DialogTitle title={TITLE[variant]} onClose={onClose} />
      <DialogContent>
        <Flex gap={2} flexDirection="column" alignItems="center" width="100%">
          <Flex gap={1} alignItems="center">
            <Image src={iconUrl} width={28} height={28} alt={symbol} />
            <Text tid="POOL.NAME" values={{ symbol }} component="p" variant="h4" fontWeight={600} />
          </Flex>
          <ValuesList title="POSITION.SUCCESS.SUB_TITLE" list={valuesList} />
        </Flex>
      </DialogContent>
      <DialogActions>
        <Button title="COMMON.CONFIRM" width="200px" onClick={handleClick} />
      </DialogActions>
    </Fragment>
  );
};

export default PoolConfirmDialog;
