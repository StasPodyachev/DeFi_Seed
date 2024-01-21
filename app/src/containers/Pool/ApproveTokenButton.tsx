import { FC, useEffect, MouseEvent } from 'react';
import { erc20ABI, usePrepareContractWrite, useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { performApprovedAmountValue } from '@utils/api/positions';
import { AddressType } from '@models';
import { Button } from '@components';

const ApproveTokenButtonContainer: FC = (): JSX.Element => {
  const { chainId, userAddress } = useTypedSelector((state) => state.user);
  const { amount, alpAddress, address, symbol, decimals, isUpdateApprovedAmount } = useTypedSelector(
    (state) => state.form.poolForm,
  );
  const { updatePoolValues } = useActions();

  const { config } = usePrepareContractWrite({
    address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [alpAddress, ethers?.constants?.MaxUint256.toBigInt()],
  });
  const { data: approveContractData, write: onApprove, isLoading: isLoadingApproveContract } = useContractWrite(config);
  const { isLoading: waitingApprove, isSuccess: isSuccessWaitingApprove } = useWaitForTransaction({
    hash: approveContractData?.hash as AddressType,
  });
  const { data: approvedAmount, refetch: refetchApprovedAmount } = useContractRead({
    address,
    abi: erc20ABI,
    chainId,
    functionName: 'allowance',
    args: [userAddress, alpAddress],
  });

  const approvedAmountValue = performApprovedAmountValue(approvedAmount, decimals);
  const isDisabled = approvedAmountValue >= amount;
  const isLoading = isLoadingApproveContract || waitingApprove;

  useEffect(() => {
    updatePoolValues({ field: 'approvedAmount', value: approvedAmountValue });
  }, [approvedAmountValue]);

  useEffect(() => {
    if (isSuccessWaitingApprove || isUpdateApprovedAmount) {
      refetchApprovedAmount?.();

      if (isUpdateApprovedAmount) updatePoolValues({ field: 'isUpdateApprovedAmount', value: false });
    }
  }, [isSuccessWaitingApprove, isUpdateApprovedAmount]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onApprove?.();
  };

  return (
    <Button
      title="COMMON.APPROVE_TOKEN_SYMBOL"
      tValues={{ symbol }}
      fullWidth
      loading={isLoading}
      disabled={isDisabled}
      onClick={handleClick}
    />
  );
};

export default ApproveTokenButtonContainer;
