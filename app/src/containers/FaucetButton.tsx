import { FC, useEffect } from 'react';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { AddressType } from '@models';
import { DIALOGS } from '@constants';
import { FaucetButton } from '@components';

export type MetamaskButtonContainerProps = {
  address: AddressType;
  symbol: string;
  decimals: number;
  onSuccess?: () => void;
};

const FaucetButtonContainer: FC<MetamaskButtonContainerProps> = ({
  address,
  symbol,
  decimals,
  onSuccess,
}): JSX.Element => {
  const { faucetToken } = useTypedSelector((state) => state.tokens);
  const { getFaucetToken, resetFaucetToken, openDialog, closeDialog } = useActions();

  useEffect(() => {
    if (faucetToken.hasData && faucetToken.symbol === symbol) {
      closeDialog({ name: DIALOGS.WAITING_CONFIRMATION });
      resetFaucetToken();

      if (faucetToken.status === 200) {
        openDialog({
          name: DIALOGS.FAUCET_SUCCESS,
          data: {
            symbol,
            MetamaskButtonProps: {
              address,
              symbol,
              decimals,
            },
          },
        });
        onSuccess?.();
        return;
      }

      openDialog({ name: DIALOGS.FAUCET_ERROR, data: { error: faucetToken.error } });
    }
  }, [faucetToken]);

  const handleClick = () => {
    openDialog({ name: DIALOGS.WAITING_CONFIRMATION, data: { title: 'FAUCET.WAITING', subTitle: null } });
    getFaucetToken(address, symbol);
  };

  return <FaucetButton onClick={handleClick} />;
};

export default FaucetButtonContainer;
