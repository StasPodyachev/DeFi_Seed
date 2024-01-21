import { FC } from 'react';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { AddressType } from '@models';
import { DIALOGS } from '@constants';
import { MetamaskButton, ButtonProps } from '@components';

export type MetamaskButtonContainerProps = {
  address: AddressType;
  symbol: string;
  decimals: number;
} & ButtonProps;

const MetamaskButtonContainer: FC<MetamaskButtonContainerProps> = ({
  address,
  symbol,
  decimals,
  ...props
}): JSX.Element => {
  const { isMetamask } = useTypedSelector((state) => state.user);
  const { addTokenToMetamask, openDialog } = useActions();

  const handleClick = () => {
    if (!isMetamask) {
      openDialog({ name: DIALOGS.METAMASK_NOT_FOUND });
      return;
    }

    addTokenToMetamask({ address, symbol, decimals });
  };

  return <MetamaskButton {...props} onClick={handleClick} />;
};

export default MetamaskButtonContainer;
