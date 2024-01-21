import { FC, useEffect, MouseEvent, memo } from 'react';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { convertNumberToBigInt } from '@utils';
import ALP_ABI from '@contracts/abi/ALP.json';
import ROUTES from '@constants/routes';
import { DIALOGS, ELEMENT_IDS } from '@constants';
import { Button } from '@components';

type PoolWithdrawButtonContainerProps = {
  isDisabled: boolean;
  isLowPoolAmount: boolean;
};

const PoolWithdrawButtonContainer: FC<PoolWithdrawButtonContainerProps> = ({
  isDisabled,
  isLowPoolAmount,
}): JSX.Element => {
  const { poolForm } = useTypedSelector((state) => state.form);
  const { openDialog, closeAllDialogs, updatePoolValues, setWithdrawPoolTxAddress, setWithdrawPoolData } = useActions();
  const { amount, decimals, alpAddress, isApprovedTokens, isConfirmedWithdraw } = poolForm;

  const { config, refetch: refetchPrepareConfig } = usePrepareContractWrite({
    address: alpAddress,
    abi: ALP_ABI,
    functionName: 'withdraw',
    args: [convertNumberToBigInt(amount, decimals)],
  });
  const { data, write: onWithdraw, isLoading, isSuccess, isError, reset: resetWithdraw } = useContractWrite(config);

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
      resetWithdraw?.();
    }
  }, [isError]);

  useEffect(() => {
    if (isConfirmedWithdraw) {
      onWithdraw?.();
      updatePoolValues({ field: 'isConfirmedWithdraw', value: false });
    }
  }, [isConfirmedWithdraw]);

  useEffect(() => {
    if (data && isSuccess) {
      closeAllDialogs();
      openDialog({
        name: DIALOGS.TRANSACTION_SUBMITTED,
        data: {
          txAddress: data?.hash,
          ButtonProps: { url: `${ROUTES.DASHBOARD}#${ELEMENT_IDS.DASHBOARD_POOLS}` },
        },
      });
      setWithdrawPoolTxAddress(data?.hash);
      setWithdrawPoolData(poolForm);
    }
  }, [data, isSuccess]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isLowPoolAmount) {
      openDialog({ name: DIALOGS.TRANSACTION_ERROR, data: { subTitle: 'POOL.LOW_AMOUNT' } });
      return;
    }

    openDialog({ name: DIALOGS.POOL_CONFIRM, data: { variant: 'withdraw' } });
  };

  return <Button title="COMMON.WITHDRAW" fullWidth loading={isLoading} disabled={isDisabled} onClick={handleClick} />;
};

export default memo(PoolWithdrawButtonContainer);
