import { FC, useEffect, Fragment } from 'react';
import { useWaitForTransaction } from 'wagmi';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { DIALOGS, EMPTY_ADDRESS } from '@constants';
import { PendingTransactionBanner, WaitingPositionsBanner } from '@components';

type TransactionsContainerProps = {
  showBanner?: boolean;
};

const TransactionsContainer: FC<TransactionsContainerProps> = ({ showBanner = false }): JSX.Element => {
  const { chainId, userAddress } = useTypedSelector((state) => state.user);
  const { poolForm } = useTypedSelector((state) => state.form);
  const { openPositionTxAddress, closePositionTxAddress, depositPoolTxAddress, withdrawPoolTxAddress } =
    useTypedSelector((state) => state.transactions);
  const { openedPositions, closedPositions } = useTypedSelector((state) => state.positions);
  const {
    openDialog,
    closeAllDialogs,
    setOpenPositionTxAddress,
    setClosePositionTxAddress,
    setDepositPoolTxAddress,
    setWithdrawPoolTxAddress,
    getPositions,
  } = useActions();

  const hasNewOpenedPosition = !!openedPositions.find((p) => p.openedTxAddress === openPositionTxAddress);
  const isEmptyOpenPositionTxAddress = openPositionTxAddress === EMPTY_ADDRESS;

  const hasNewClosedPosition = !!closedPositions.find((p) => p.closedTxAddress === closePositionTxAddress);
  const isEmptyClosePositionTxAddress = closePositionTxAddress === EMPTY_ADDRESS;

  const {
    data: openPositionTransactionData,
    isLoading: isOpenPositionTransactionLoading,
    isSuccess: isOpenPositionTransactionSuccess,
  } = useWaitForTransaction({
    hash: openPositionTxAddress,
  });
  const { isLoading: isClosePositionTransactionLoading, isSuccess: isClosePositionTransactionSuccess } =
    useWaitForTransaction({
      hash: closePositionTxAddress,
    });
  const {
    data: depositPoolData,
    isLoading: isDepositPoolLoading,
    isSuccess: isDepositPoolSuccess,
  } = useWaitForTransaction({
    hash: depositPoolTxAddress,
  });
  const {
    data: withdrawPoolData,
    isLoading: isWithdrawPoolLoading,
    isSuccess: isWithdrawPoolSuccess,
  } = useWaitForTransaction({
    hash: withdrawPoolTxAddress,
  });

  useEffect(() => {
    if (isOpenPositionTransactionSuccess && openPositionTransactionData) {
      const { transactionHash } = openPositionTransactionData as any;
      closeAllDialogs();
      openDialog({ name: DIALOGS.POSITION_SUCCESS, data: { txAddress: transactionHash } });
    }
  }, [isOpenPositionTransactionSuccess, openPositionTransactionData]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined = undefined;

    if (
      (isOpenPositionTransactionSuccess && !isEmptyOpenPositionTxAddress && !hasNewOpenedPosition) ||
      (!isEmptyClosePositionTxAddress && !hasNewClosedPosition)
    ) {
      timer = setInterval(() => {
        getPositions(chainId, userAddress, true);
      }, 5000);
    }

    if (!isEmptyOpenPositionTxAddress && hasNewOpenedPosition) {
      clearInterval(timer);
      setOpenPositionTxAddress(EMPTY_ADDRESS);
    }

    if (!isEmptyClosePositionTxAddress && hasNewClosedPosition) {
      clearInterval(timer);
      setClosePositionTxAddress(EMPTY_ADDRESS);
    }

    return () => {
      clearInterval(timer);
    };
  }, [
    isOpenPositionTransactionSuccess,
    isEmptyOpenPositionTxAddress,
    hasNewOpenedPosition,
    hasNewClosedPosition,
    isEmptyClosePositionTxAddress,
  ]);

  useEffect(() => {
    if (isDepositPoolSuccess && depositPoolData) {
      const { transactionHash } = depositPoolData as any;
      closeAllDialogs();
      openDialog({
        name: DIALOGS.POOL_SUCCESS,
        data: {
          txAddress: transactionHash,
          variant: 'deposit',
          MetamaskButtonProps: {
            address: poolForm.alpAddress,
            symbol: poolForm.alpSymbol,
            decimals: poolForm.decimals,
          },
        },
      });
      setDepositPoolTxAddress(EMPTY_ADDRESS);
    }
  }, [isDepositPoolSuccess, depositPoolData]);

  useEffect(() => {
    if (isWithdrawPoolSuccess && withdrawPoolData) {
      const { transactionHash } = withdrawPoolData as any;
      closeAllDialogs();
      openDialog({
        name: DIALOGS.POOL_SUCCESS,
        data: {
          txAddress: transactionHash,
          variant: 'withdraw',
        },
      });
      setWithdrawPoolTxAddress(EMPTY_ADDRESS);
    }
  }, [isWithdrawPoolSuccess, withdrawPoolData]);

  if (!showBanner) {
    return <Fragment />;
  }

  return (
    <Fragment>
      {isOpenPositionTransactionLoading && (
        <PendingTransactionBanner variant="openPosition" txAddress={openPositionTxAddress} chainId={chainId} />
      )}

      {isClosePositionTransactionLoading && (
        <PendingTransactionBanner variant="closePosition" txAddress={closePositionTxAddress} chainId={chainId} />
      )}

      {isOpenPositionTransactionSuccess &&
        !isOpenPositionTransactionLoading &&
        !isEmptyOpenPositionTxAddress &&
        !hasNewOpenedPosition && <WaitingPositionsBanner txAddress={openPositionTxAddress} chainId={chainId} />}

      {isClosePositionTransactionSuccess &&
        !isClosePositionTransactionLoading &&
        !isEmptyClosePositionTxAddress &&
        !hasNewClosedPosition && <WaitingPositionsBanner txAddress={closePositionTxAddress} chainId={chainId} />}

      {isDepositPoolLoading && (
        <PendingTransactionBanner variant="depositPool" txAddress={depositPoolTxAddress} chainId={chainId} />
      )}

      {isWithdrawPoolLoading && (
        <PendingTransactionBanner variant="withdrawPool" txAddress={withdrawPoolTxAddress} chainId={chainId} />
      )}
    </Fragment>
  );
};

export default TransactionsContainer;
