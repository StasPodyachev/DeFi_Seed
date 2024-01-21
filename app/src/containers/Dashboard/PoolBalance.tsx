import { FC, memo, useEffect } from 'react';
import { useBalance, useWaitForTransaction } from 'wagmi';

import useTypedSelector from '@hooks/useTypedSelector';
import { Pool } from '@models/pools';
import { roundFormattedValue } from '@utils';
import { DashboardPoolBalance, ValuesListLoaderItem } from '@components';

const PoolBalanceContainer: FC<Pool> = (props): JSX.Element => {
  const { chainId, userAddress } = useTypedSelector((state) => state.user);
  const { depositPoolTxAddress, withdrawPoolTxAddress } = useTypedSelector((state) => state.transactions);
  const { address } = props;

  const {
    data,
    isLoading,
    refetch: refetchUserBalance,
  } = useBalance({
    address: userAddress,
    token: address,
    chainId,
  });

  const { data: depositPoolData, isSuccess: isDepositPoolSuccess } = useWaitForTransaction({
    hash: depositPoolTxAddress,
  });
  const { data: withdrawPoolData, isSuccess: isWithdrawPoolSuccess } = useWaitForTransaction({
    hash: withdrawPoolTxAddress,
  });

  useEffect(() => {
    if ((depositPoolData && isDepositPoolSuccess) || (withdrawPoolData && isWithdrawPoolSuccess)) {
      refetchUserBalance?.();
    }
  }, [depositPoolData, withdrawPoolData]);

  if (isLoading) {
    return <ValuesListLoaderItem />;
  }

  const amount = roundFormattedValue(data?.formatted);

  return <DashboardPoolBalance {...props} amount={amount} />;
};

export default memo(PoolBalanceContainer);
