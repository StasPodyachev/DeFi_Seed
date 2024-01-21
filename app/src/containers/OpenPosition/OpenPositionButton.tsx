import { FC, useEffect, useState, MouseEvent } from 'react';
import { usePrepareContractWrite, useContractWrite, useBalance } from 'wagmi';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { convertNumberToBigInt, convertFormattedValue, convertNumberToBigIntPercent } from '@utils';
import D4X_ABI from '@contracts/abi/D4X.json';
import { DIALOGS, SLIPPAGE, LIMIT_ERROR } from '@constants';
import { Button } from '@components';

const limitErrors = Object.values(LIMIT_ERROR);

const OpenPositionButtonContainer: FC = (): JSX.Element => {
  const [isLeverageError, setIsLeverageError] = useState(false);
  const [isLimitError, setLimitError] = useState(false);
  const { userAddress, chainId } = useTypedSelector((state) => state.user);
  const { positionForm } = useTypedSelector((state) => state.form);
  const addresses = useTypedSelector((state) => state.addresses.list[chainId]);
  const { openDialog, closeAllDialogs, updatePositionValues, setOpenPositionTxAddress, setOpenPositionData } =
    useActions();
  const { tokenSell, tokenBuy, leverage, exchange, approvedAmount, isApprovedTokens, path, isConfirmed } = positionForm;
  const amount = convertNumberToBigInt(tokenSell.amount, tokenSell.decimals);
  const slippage = convertNumberToBigIntPercent(SLIPPAGE);
  const d4xAddresses = addresses?.D4X;

  const { data: userBalanceData, refetch: refetchUserBalance } = useBalance({
    address: userAddress,
    token: tokenSell.address,
    chainId,
  });

  const userBalance = convertFormattedValue(userBalanceData?.formatted);
  const isDisabled =
    tokenSell.amount > userBalance || tokenSell.amount === 0 || tokenSell.amount > approvedAmount || !isApprovedTokens;

  const { config, refetch: refetchPrepareConfig } = usePrepareContractWrite({
    address: d4xAddresses,
    abi: D4X_ABI,
    functionName: 'createPosition',
    args: [
      {
        tokenSell: tokenSell.address,
        tokenBuy: tokenBuy.address,
        amount,
        leverage,
        slippage,
        amountOut: BigInt(tokenBuy.amountRaw || ''),
        dexType: +exchange.value,
        path,
      },
    ],
    onSuccess() {
      setIsLeverageError(false);
      setLimitError(false);
    },
    onError({ message }) {
      if (message.includes('ALP: Insufficient in reserve')) {
        setIsLeverageError(true);
      }

      if (limitErrors.some((e) => message.includes(e))) {
        setLimitError(true);
      }
    },
  });
  const {
    data,
    write: openPosition,
    isLoading,
    isSuccess,
    isError,
    reset: resetOpenPosition,
  } = useContractWrite(config);

  useEffect(() => {
    refetchUserBalance?.();
  }, [tokenSell.amount, approvedAmount, isApprovedTokens]);

  useEffect(() => {
    if (isApprovedTokens && !isDisabled) {
      refetchPrepareConfig?.();
    }
  }, [isApprovedTokens, isDisabled]);

  useEffect(() => {
    if (isLoading) {
      openDialog({ name: DIALOGS.WAITING_CONFIRMATION });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      closeAllDialogs();
      openDialog({ name: DIALOGS.TRANSACTION_ERROR });
      resetOpenPosition();
    }
  }, [isError]);

  useEffect(() => {
    if (isConfirmed) {
      openPosition?.();
      updatePositionValues({ field: 'isConfirmed', value: false });
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (data && isSuccess) {
      closeAllDialogs();
      openDialog({
        name: DIALOGS.TRANSACTION_SUBMITTED,
        data: {
          txAddress: data?.hash,
        },
      });
      setOpenPositionTxAddress(data?.hash);
      setOpenPositionData(positionForm);

      setTimeout(() => {
        updatePositionValues({ field: 'isUpdateApprovedAmount', value: true });
      }, 3000);
    }
  }, [data, isSuccess]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isApprovedTokens) return;

    if (isLeverageError) {
      openDialog({ name: DIALOGS.POSITION_LEVERAGE_ERROR });
      return;
    }

    if (isLimitError) {
      openDialog({ name: DIALOGS.LIMIT_ERROR });
      return;
    }

    openDialog({ name: DIALOGS.POSITION_CONFIRM });
  };

  return (
    <Button title="COMMON.OPEN_POSITION" fullWidth loading={isLoading} disabled={isDisabled} onClick={handleClick} />
  );
};

export default OpenPositionButtonContainer;
