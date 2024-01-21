import { FC, Fragment, ReactNode, useEffect } from 'react';
import { useNetwork, useAccount } from 'wagmi';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { DIALOGS } from '@constants';
import { Loader } from '@components';

type UserAuthWrapProps = {
  children: ReactNode;
};

const UserAuthWrap: FC<UserAuthWrapProps> = ({ children }): JSX.Element => {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { isUserInit, userAddress, isUserConnected, chainId, isWrongNetwork, isMetamask } = useTypedSelector(
    (state) => state.user,
  );
  const { hasData, loading: isAddressesLoading } = useTypedSelector((state) => state.addresses);
  const {
    setUserAddress,
    setUserChainId,
    setUserConnectStatus,
    setUserInitStatus,
    openDialog,
    setMetamaskStatus,
    getAddresses,
  } = useActions();

  useEffect(() => {
    // @ts-ignore
    const _isMetamask = !!window?.ethereum?.isMetaMask;

    if (!hasData || (hasData && address !== userAddress)) {
      getAddresses(address);
    }
    if (chain && chain.id !== chainId) {
      setUserChainId(chain.id);
    }
    if (address && address !== userAddress) {
      setUserAddress(address);
    }
    if (isConnected !== isUserConnected) {
      setUserConnectStatus(isConnected);
    }
    if (_isMetamask !== isMetamask) {
      setMetamaskStatus(_isMetamask);
    }
    if (!isUserInit) {
      setUserInitStatus(true);
    }
  }, [chain?.id, address, isConnected]);

  useEffect(() => {
    if (isWrongNetwork) {
      openDialog({ name: DIALOGS.WRONG_NETWORK });
    }
  }, [isWrongNetwork]);

  if (isAddressesLoading) {
    return <Loader fixed />;
  }

  return <Fragment>{isUserInit && children}</Fragment>;
};

export default UserAuthWrap;
