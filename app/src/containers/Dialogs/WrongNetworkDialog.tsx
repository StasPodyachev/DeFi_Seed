import React, { Fragment, FC, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import DialogContent from '@mui/material/DialogContent';
import Flex from '@mui/material/Stack';

import theme from '@theme';
import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { SEPOLIA, DIALOGS } from '@constants';
import { DialogTitle, ConnectButton, Text, Button, MetamaskBrowserLink } from '@components';

type WrongNetworkDialogProps = {
  onClose: () => void;
};

const WrongNetworkDialog: FC<WrongNetworkDialogProps> = (): JSX.Element => {
  const { isWrongNetwork, isMetamask } = useTypedSelector((state) => state.user);
  const { addChain, closeDialog } = useActions();

  useEffect(() => {
    if (!isWrongNetwork) closeDialog({ name: DIALOGS.WRONG_NETWORK });
  }, [isWrongNetwork]);

  return (
    <Fragment>
      <DialogTitle title="COMMON.WRONG_NETWORK.TITLE" color={theme.palette.error.main} />
      <DialogContent>
        <Flex gap={1} flexDirection="column" alignItems="center">
          {!isMobile && (
            <Fragment>
              <Text tid="COMMON.WRONG_NETWORK.SUB_TITLE" variant="body1" textAlign="center" />
              <ConnectButton />
            </Fragment>
          )}

          {isMobile && !isMetamask && (
            <Fragment>
              <Text tid="COMMON.ADD_CHAINS.NO_METAMASK" variant="body1" textAlign="center" />
              <MetamaskBrowserLink />
            </Fragment>
          )}

          {isMobile && isMetamask && (
            <Fragment>
              <Text tid="COMMON.ADD_CHAINS.TITLE" variant="body2" textAlign="center" />

              <Button title={SEPOLIA.chainName} size="small" width="250px" onClick={() => addChain(SEPOLIA)} />
            </Fragment>
          )}
        </Flex>
      </DialogContent>
    </Fragment>
  );
};

export default WrongNetworkDialog;
