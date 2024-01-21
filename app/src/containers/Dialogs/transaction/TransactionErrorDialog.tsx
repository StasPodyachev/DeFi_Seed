import React, { Fragment, FC } from 'react';
import DialogContent from '@mui/material/DialogContent';
import Flex from '@mui/material/Stack';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import theme from '@theme';
import { DialogTitle, Text } from '@components';

type TransactionErrorDialogProps = {
  data: {
    subTitle?: string;
  };
  onClose: () => void;
};

const TransactionErrorDialog: FC<TransactionErrorDialogProps> = ({ data, onClose }): JSX.Element => {
  const { subTitle = 'TRANSACTION.ERROR.SUB_TITLE' } = data;

  return (
    <Fragment>
      <DialogTitle title="TRANSACTION.ERROR.TITLE" color={theme.palette.error.main} onClose={onClose} />
      <DialogContent>
        <Flex gap={1} flexDirection="column" alignItems="center">
          <WarningAmberIcon htmlColor={theme.palette.error.main} sx={{ width: 64, height: 64 }} />
          <Text tid={subTitle} variant="body1" color={theme.palette.error.main} align="center" />
        </Flex>
      </DialogContent>
    </Fragment>
  );
};

export default TransactionErrorDialog;
