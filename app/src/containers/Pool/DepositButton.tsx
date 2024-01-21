import { FC, useEffect, MouseEvent, memo, useState } from 'react';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { convertNumberToBigInt } from '@utils';
import ALP_ABI from '@contracts/abi/ALP.json';
import ROUTES from '@constants/routes';
import { DIALOGS, ELEMENT_IDS, LIMIT_ERROR } from '@constants';
import { Button } from '@components';

const limitErrors = Object.values(LIMIT_ERROR);

type PoolDepositButtonContainerProps = {
  isDisabled: boolean;
};

const PoolDepositButtonContainer: FC<PoolDepositButtonContainerProps> = ({ isDisabled }): JSX.Element => {
  const [isLimitError, setLimitError] = useState(false);
  const { chainId } = useTypedSelector((state) => state.user);
  const { poolForm } = useTypedSelector((state) => state.form);
  const { openDialog, closeAllDialogs, updatePoolValues, setDepositPoolTxAddress, setDepositPoolData } = useActions();
  const { amount, decimals, alpAddress, alpSymbol, isApprovedTokens, isConfirmedDeposit } = poolForm;

  const { config, refetch: refetchPrepareConfig } = usePrepareContractWrite({
    address: alpAddress,
    abi: ALP_ABI,
    functionName: 'deposit',
    chainId,
    args: [convertNumberToBigInt(amount, decimals)],
    onSuccess() {
      setLimitError(false);
    },
    onError({ message }) {
      if (limitErrors.some((e) => message.includes(e))) {
        setLimitError(true);
      }
    },
  });
  const { data, write: onDeposit, isLoading, isSuccess, isError, reset: resetDeposit } = useContractWrite(config);

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
      resetDeposit?.();
    }
  }, [isError]);

  useEffect(() => {
    if (isConfirmedDeposit) {
      onDeposit?.();
      updatePoolValues({ field: 'isConfirmedDeposit', value: false });
    }
  }, [isConfirmedDeposit]);

  useEffect(() => {
    if (data && isSuccess) {
      closeAllDialogs();
      openDialog({
        name: DIALOGS.TRANSACTION_SUBMITTED,
        data: {
          txAddress: data?.hash,
          MetamaskButtonProps: {
            address: alpAddress,
            symbol: alpSymbol,
            decimals,
          },
          ButtonProps: { url: `${ROUTES.DASHBOARD}#${ELEMENT_IDS.DASHBOARD_POOLS}` },
        },
      });
      setDepositPoolTxAddress(data?.hash);
      setDepositPoolData(poolForm);

      setTimeout(() => {
        updatePoolValues({ field: 'isUpdateApprovedAmount', value: true });
      }, 3000);
    }
  }, [data, isSuccess]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isLimitError) {
      openDialog({ name: DIALOGS.LIMIT_ERROR });
      return;
    }

    openDialog({ name: DIALOGS.POOL_CONFIRM, data: { variant: 'deposit' } });
  };

  return <Button title="COMMON.DEPOSIT" fullWidth loading={isLoading} disabled={isDisabled} onClick={handleClick} />;
};

export default memo(PoolDepositButtonContainer);
