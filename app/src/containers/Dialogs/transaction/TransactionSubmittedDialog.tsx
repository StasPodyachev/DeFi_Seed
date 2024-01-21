import React, { Fragment, FC } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Flex from '@mui/material/Stack';

import theme from '@theme';
import useTypedSelector from '@hooks/useTypedSelector';
import { AddressType } from '@models';
import { redirect } from '@utils/navigation';
import ROUTES from '@constants/routes';
import { DialogTitle, ExplorerLink, Text, Button } from '@components';
import MetamaskButtonContainer, { MetamaskButtonContainerProps } from '../../MetamaskButton';

type TransactionSubmittedDialogProps = {
  data: {
    txAddress?: AddressType;
    MetamaskButtonProps?: MetamaskButtonContainerProps;
    ButtonProps?: {
      title?: string;
      url?: string;
    };
  };
  onClose: () => void;
};

const TransactionSubmittedDialog: FC<TransactionSubmittedDialogProps> = ({ data, onClose }): JSX.Element => {
  const { chainId } = useTypedSelector((state) => state.user);
  const { txAddress, MetamaskButtonProps, ButtonProps = {} } = data;
  const { title: buttonTitle = 'COMMON.GO_TO_DASHBOARD', url = ROUTES.DASHBOARD } = ButtonProps;

  const handleClick = () => {
    redirect(url);
    onClose();
  };

  return (
    <Fragment>
      <DialogTitle title="TRANSACTION.SUBMITTED.TITLE" onClose={onClose} />
      <DialogContent>
        <Flex gap={2} flexDirection="column" alignItems="center">
          {txAddress && chainId && <ExplorerLink address={txAddress} chainId={chainId} />}
          <Text
            tid="TRANSACTION.SUBMITTED.SUB_TITLE"
            variant="body1"
            color={theme.palette.grey[400]}
            align="center"
            maxWidth={500}
          />
        </Flex>
      </DialogContent>
      <DialogActions>
        <Flex gap={2} flexDirection="column" alignItems="center" maxWidth={200} width="100%">
          {MetamaskButtonProps && <MetamaskButtonContainer {...MetamaskButtonProps} fullWidth />}
          <Button title={buttonTitle} onClick={handleClick} fullWidth />
        </Flex>
      </DialogActions>
    </Fragment>
  );
};

export default TransactionSubmittedDialog;
