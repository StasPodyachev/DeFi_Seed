import React, { Fragment, FC } from 'react';
import Image from 'next/image';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Flex from '@mui/material/Stack';

import { getStaticAssetPath } from '@utils';
import { DialogTitle } from '@components';
import MetamaskButtonContainer, { MetamaskButtonContainerProps } from '../../MetamaskButton';
import SubTitle from './SubTitle';

type FaucetSuccessDialogProps = {
  data: {
    symbol: string;
    MetamaskButtonProps: MetamaskButtonContainerProps;
  };
  onClose: () => void;
};

const FaucetSuccessDialog: FC<FaucetSuccessDialogProps> = ({ data, onClose }): JSX.Element => {
  const { symbol, MetamaskButtonProps } = data;

  return (
    <Fragment>
      <DialogTitle title="FAUCET.SUCCESS" tValues={{ symbol }} onClose={onClose} />
      <DialogContent>
        <Flex gap={2} flexDirection="column" alignItems="center" width="100%">
          <Image src={getStaticAssetPath('coin.svg')} width={100} height={100} alt="" />
          <SubTitle text="FAUCET.ADD_TO" />
        </Flex>
      </DialogContent>
      <DialogActions>
        <MetamaskButtonContainer {...MetamaskButtonProps} width="200px" />
      </DialogActions>
    </Fragment>
  );
};

export default FaucetSuccessDialog;
