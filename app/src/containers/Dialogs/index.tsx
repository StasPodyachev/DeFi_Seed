import { FC, Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import { Breakpoint } from '@mui/system';

import useActions from '@hooks/useActions';
import useTypedSelector from '@hooks/useTypedSelector';
import { DIALOGS } from '@constants';
import WaitingConfirmationDialog from './transaction/WaitingConfirmationDialog';
import TransactionSubmittedDialog from './transaction/TransactionSubmittedDialog';
import TransactionErrorDialog from './transaction/TransactionErrorDialog';
import PositionConfirmDialog from './position/PositionConfirmDialog';
import PositionSuccessDialog from './position/PositionSuccessDialog';
import PositionLeverageErrorDialog from './position/PositionLeverageErrorDialog';
import PoolConfirmDialog from './pool/PoolConfirmDialog';
import PoolSuccessDialog from './pool/PoolSuccessDialog';
import FaucetTokensDialog from './faucet/FaucetTokensDialog';
import FaucetSuccessDialog from './faucet/FaucetSuccessDialog';
import FaucetErrorDialog from './faucet/FaucetErrorDialog';
import MetamaskNotFoundDialog from './MetamaskNotFoundDialog';
import WrongNetworkDialog from './WrongNetworkDialog';
import UserBackDialog from './userBack/UserBackDialog';
import LimitErrorDialog from './LimitErrorDialog';

const DIALOG_COMPONENTS = {
  [DIALOGS.WAITING_CONFIRMATION]: WaitingConfirmationDialog,
  [DIALOGS.TRANSACTION_SUBMITTED]: TransactionSubmittedDialog,
  [DIALOGS.TRANSACTION_ERROR]: TransactionErrorDialog,
  [DIALOGS.POSITION_CONFIRM]: PositionConfirmDialog,
  [DIALOGS.POSITION_SUCCESS]: PositionSuccessDialog,
  [DIALOGS.POSITION_LEVERAGE_ERROR]: PositionLeverageErrorDialog,
  [DIALOGS.POOL_CONFIRM]: PoolConfirmDialog,
  [DIALOGS.POOL_SUCCESS]: PoolSuccessDialog,
  [DIALOGS.FAUCET_TOKENS]: FaucetTokensDialog,
  [DIALOGS.FAUCET_SUCCESS]: FaucetSuccessDialog,
  [DIALOGS.FAUCET_ERROR]: FaucetErrorDialog,
  [DIALOGS.METAMASK_NOT_FOUND]: MetamaskNotFoundDialog,
  [DIALOGS.WRONG_NETWORK]: WrongNetworkDialog,
  [DIALOGS.USER_BACK]: UserBackDialog,
  [DIALOGS.LIMIT_ERROR]: LimitErrorDialog,
};

const MEDIA_SIZE: { [keys: string]: Breakpoint } = {
  [DIALOGS.POSITION_CONFIRM]: 'sm',
  [DIALOGS.POSITION_SUCCESS]: 'sm',
  [DIALOGS.FAUCET_TOKENS]: 'sm',
};

const DISABLE_CLOSE: { [keys: string]: boolean } = {
  [DIALOGS.FAUCET_TOKENS]: true,
  [DIALOGS.WRONG_NETWORK]: true,
};

const Dialogs: FC = (): JSX.Element => {
  const dialogs = useTypedSelector((state) => state.dialogs);
  const { closeDialog } = useActions();

  return (
    <Fragment>
      {Object.values(DIALOGS).map((dialogName) => {
        const DialogComponent = DIALOG_COMPONENTS[dialogName];
        const data: any = dialogs[dialogName].data || {};

        const onClose = () => {
          if (DISABLE_CLOSE[dialogName]) {
            return;
          }

          closeDialog({ name: dialogName });
        };

        if (dialogs[dialogName].isOpen) {
          return (
            <Dialog key={dialogName} open onClose={() => onClose()} maxWidth={MEDIA_SIZE[dialogName]}>
              <DialogComponent data={data} onClose={onClose} />
            </Dialog>
          );
        }

        return null;
      })}
    </Fragment>
  );
};

export default Dialogs;
