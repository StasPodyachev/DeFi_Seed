import React, { Fragment, FC } from 'react';
import DialogContent from '@mui/material/DialogContent';
import Flex from '@mui/material/Stack';

import theme from '@theme';
import { DialogTitle, Text, MetamaskBrowserLink } from '@components';

type MetamaskNotFoundDialogProps = {
  onClose: () => void;
};

const MetamaskNotFoundDialog: FC<MetamaskNotFoundDialogProps> = ({ onClose }): JSX.Element => (
  <Fragment>
    <DialogTitle title="COMMON.METAMASK_NOT_FOUND.TITLE" color={theme.palette.error.main} onClose={onClose} />
    <DialogContent>
      <Flex gap={1} flexDirection="column" alignItems="center">
        <Text tid="COMMON.METAMASK_NOT_FOUND.SUB_TITLE" variant="body1" textAlign="center" />
        <MetamaskBrowserLink />
      </Flex>
    </DialogContent>
  </Fragment>
);

export default MetamaskNotFoundDialog;
