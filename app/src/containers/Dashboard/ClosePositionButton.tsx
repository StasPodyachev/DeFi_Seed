import { FC, useEffect } from 'react';
import { usePrepareContractWrite, useContractWrite, useContractRead } from 'wagmi';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { Position } from '@models/positions';
import UNISWAP_RATE_ABI from '@contracts/abi/UniswapExchange.json';
import D4X_ABI from '@contracts/abi/D4X.json';
import { convertNumberToBigInt } from '@utils';
import { DIALOGS } from '@constants';
import { EXCHANGERS } from '@constants/dictionaries';
import { Button } from '@components';

const ClosePositionButtonContainer: FC<Position> = ({
  id,
  exchangeValue,
  tokenBuyAddress,
  tokenSellAddress,
  tokenBuyAmount,
  tokenBuyDecimals,
}): JSX.Element => {
  const { chainId } = useTypedSelector((state) => state.user);
  const addresses = useTypedSelector((state) => state.addresses.list[chainId]);
  const { openDialog, closeAllDialogs, setClosePositionTxAddress } = useActions();
  const [uniswap] = EXCHANGERS;

  const { data: exchangeData } = useContractRead({
    functionName: 'getBestRoute',
    args: [tokenBuyAddress, tokenSellAddress, convertNumberToBigInt(tokenBuyAmount, tokenBuyDecimals)],
    chainId,
    address: addresses?.UniswapExchange,
    abi: UNISWAP_RATE_ABI,
    enabled: exchangeValue === uniswap.value,
  });

  const { config } = usePrepareContractWrite({
    address: addresses?.D4X,
    abi: D4X_ABI,
    chainId,
    functionName: 'closePosition',
    args: [id, Array.isArray(exchangeData) ? exchangeData[1] : '0x'],
  });
  const {
    data,
    write: closePosition,
    isLoading,
    isSuccess,
    isError,
    reset: resetClosePosition,
  } = useContractWrite(config);

  useEffect(() => {
    if (isLoading) {
      openDialog({ name: DIALOGS.WAITING_CONFIRMATION });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      closeAllDialogs();
      openDialog({ name: DIALOGS.TRANSACTION_ERROR });
      resetClosePosition();
    }
  }, [isError]);

  useEffect(() => {
    if (data && isSuccess) {
      closeAllDialogs();
      openDialog({ name: DIALOGS.TRANSACTION_SUBMITTED, data: { txAddress: data?.hash } });
      setClosePositionTxAddress(data?.hash);
    }
  }, [data]);

  const handleClick = () => {
    closePosition?.();
  };

  return <Button title="COMMON.CLOSE_POSITION" onClick={handleClick} loading={isLoading} width="100%" size="small" />;
};

export default ClosePositionButtonContainer;
