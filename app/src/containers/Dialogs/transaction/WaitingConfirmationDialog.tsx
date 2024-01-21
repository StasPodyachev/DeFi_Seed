import React, { Fragment, FC } from 'react';
import DialogContent from '@mui/material/DialogContent';
import Flex from '@mui/material/Stack';

import theme from '@theme';
import { DialogTitle, Text, Loader } from '@components';

type WaitingConfirmationDialogProps = {
  data: {
    title: string;
    subTitle: string;
  };
  onClose: () => void;
};

const WaitingConfirmationDialog: FC<WaitingConfirmationDialogProps> = ({ data, onClose }): JSX.Element => {
  const { title = 'TRANSACTION.WAITING_CONFIRMATION.TITLE', subTitle = 'TRANSACTION.WAITING_CONFIRMATION.SUB_TITLE' } =
    data;

  return (
    <Fragment>
      <DialogTitle title={title} onClose={onClose} />
      <DialogContent>
        <Flex gap={3} flexDirection="column" alignItems="center">
          <Loader width={100} height={24} />
          {subTitle && <Text tid={subTitle} variant="body1" color={theme.palette.grey[400]} />}
        </Flex>
      </DialogContent>
    </Fragment>
  );
};

export default WaitingConfirmationDialog;
