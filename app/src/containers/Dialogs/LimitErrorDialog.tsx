import React, { Fragment, FC } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { DialogTitle, Text, Button } from '@components';

type LimitErrorDialogProps = {
  onClose: () => void;
};

const LimitErrorDialog: FC<LimitErrorDialogProps> = ({ onClose }): JSX.Element => (
  <Fragment>
    <DialogTitle title="COMMON.LIMIT_ERROR.TITLE" onClose={onClose} />
    <DialogContent>
      <Text tid="COMMON.LIMIT_ERROR.SUB_TITLE" component="p" variant="body1" textAlign="center" />
    </DialogContent>
    <DialogActions>
      <Button title="COMMON.OK" width="200px" onClick={onClose} />
    </DialogActions>
  </Fragment>
);

export default LimitErrorDialog;
