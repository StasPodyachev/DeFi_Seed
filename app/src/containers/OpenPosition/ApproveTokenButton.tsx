import { FC, useEffect, MouseEvent } from 'react';
import { erc20ABI, usePrepareContractWrite, useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { performApprovedAmountValue } from '@utils/api/positions';
import { AddressType } from '@models';
import { Button } from '@components';

const ApproveTokenButtonContainer: FC = (): JSX.Element => {
  const { userAddress, chainId } = useTypedSelector((state) => state.user);
  const { tokenSell, isUpdateApprovedAmount } = useTypedSelector((state) => state.form.positionForm);
  const addresses = useTypedSelector((state) => state.addresses.list[chainId]);
  const { updatePositionValues } = useActions();

  const d4xAddresses = addresses?.D4X;

  const { config } = usePrepareContractWrite({
    address: tokenSell.address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [d4xAddresses, ethers?.constants?.MaxUint256.toBigInt()],
  });
  const { data: approveContractData, write: onApprove, isLoading: isLoadingApproveContract } = useContractWrite(config);
  const { isLoading: waitingApprove, isSuccess: isSuccessWaitingApprove } = useWaitForTransaction({
    hash: approveContractData?.hash as AddressType,
  });
  const { data: approvedAmount, refetch: refetchApprovedAmount } = useContractRead({
    address: tokenSell.address,
    abi: erc20ABI,
    chainId,
    functionName: 'allowance',
    args: [userAddress, d4xAddresses],
  });

  const approvedAmountValue = performApprovedAmountValue(approvedAmount, tokenSell.decimals);
  const isDisabled = approvedAmountValue >= tokenSell.amount;
  const isLoading = isLoadingApproveContract || waitingApprove;

  useEffect(() => {
    updatePositionValues({ field: 'approvedAmount', value: approvedAmountValue });
  }, [approvedAmountValue]);

  useEffect(() => {
    if (isSuccessWaitingApprove || isUpdateApprovedAmount) {
      refetchApprovedAmount?.();

      if (isUpdateApprovedAmount) updatePositionValues({ field: 'isUpdateApprovedAmount', value: false });
    }
  }, [isSuccessWaitingApprove, isUpdateApprovedAmount]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onApprove?.();
  };

  return (
    <Button title="COMMON.APPROVE_TOKEN" fullWidth loading={isLoading} disabled={isDisabled} onClick={handleClick} />
  );
};

export default ApproveTokenButtonContainer;
