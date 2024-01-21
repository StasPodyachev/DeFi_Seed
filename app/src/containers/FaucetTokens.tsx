import { FC, Fragment, memo, useEffect } from 'react';
import { useBalance } from 'wagmi';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { AddressType } from '@models';
import { convertFormattedValue } from '@utils';
import sessionStore from '@utils/sessionStore';
import { SESSION_STORE_KEY, DIALOGS } from '@constants';

type FaucetTokensContainerProps = {
  selectedTokenAddress: AddressType;
};

const FaucetTokensContainer: FC<FaucetTokensContainerProps> = ({ selectedTokenAddress }): JSX.Element => {
  const { chainId, userAddress, isUserConnected, isWrongNetwork } = useTypedSelector((state) => state.user);
  const { chainId: tokensChainId } = useTypedSelector((state) => state.tokens);
  const { openDialog } = useActions();

  const { data: userBalanceData, isLoading } = useBalance({
    address: userAddress,
    token: selectedTokenAddress,
    chainId,
  });
  const userBalance = convertFormattedValue(userBalanceData?.formatted);

  useEffect(() => {
    if (tokensChainId !== chainId) {
      sessionStore.delete(SESSION_STORE_KEY.IS_HIDDEN_FAUCET_TOKENS_DIALOG);
    }

    if (
      isUserConnected &&
      !isWrongNetwork &&
      !isLoading &&
      userBalance === 0 &&
      !sessionStore.getData(SESSION_STORE_KEY.IS_HIDDEN_FAUCET_TOKENS_DIALOG)
    ) {
      openDialog({ name: DIALOGS.FAUCET_TOKENS });
    }
  }, [isUserConnected, isWrongNetwork, selectedTokenAddress, isLoading, userBalance, chainId, tokensChainId]);

  return <Fragment />;
};

export default memo(FaucetTokensContainer);
