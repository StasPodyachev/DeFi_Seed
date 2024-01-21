import React, { Fragment, FC } from 'react';
import DialogContent from '@mui/material/DialogContent';

import theme from '@theme';
import { FAUCET_ERROR } from '@constants';
import { DialogTitle } from '@components';
import SubTitle from './SubTitle';

type FaucetErrorDialogProps = {
  data: {
    error: string;
  };
  onClose: () => void;
};

const FaucetErrorDialog: FC<FaucetErrorDialogProps> = ({ data, onClose }): JSX.Element => {
  const { error } = data;
  const titleColor = error === FAUCET_ERROR.ERROR ? theme.palette.error.main : theme.palette.common.white;

  return (
    <Fragment>
      <DialogTitle title={`FAUCET.${error}`} color={titleColor} onClose={onClose} />
      <DialogContent>
        <SubTitle text="FAUCET.MORE_TOKENS" />
      </DialogContent>
    </Fragment>
  );
};

export default FaucetErrorDialog;
