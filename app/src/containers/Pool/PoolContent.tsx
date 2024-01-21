import { FC, useEffect } from 'react';
import Flex from '@mui/material/Stack';
import { useContractRead, useBalance } from 'wagmi';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { PoolField, PoolFieldValue } from '@models/form';
import { convertBigIntToNumber, roundNumber, convertFormattedValue } from '@utils';
import { performSharesValue } from '@utils/pool';
import ALP_ABI from '@contracts/abi/ALP.json';
import {
  ControlsWrap,
  Select,
  Input,
  ConnectButton,
  PoolApproveWrap,
  PoolInfo,
  PoolPosition,
  PoolLowBalanceError,
} from '@components';
import DepositButtonContainer from './DepositButton';
import WithdrawButtonContainer from './WithdrawButton';
import ApproveTokenButtonContainer from './ApproveTokenButton';

const PoolContentContainer: FC = (): JSX.Element => {
  const { chainId, userAddress, isUserConnected, isWrongNetwork } = useTypedSelector((state) => state.user);
  const { poolForm, poolTokensValues } = useTypedSelector((state) => state.form);
  const { updatePoolValues } = useActions();
  const { amount, address, alpAddress, alpSymbol, approvedAmount, symbol, decimals } = poolForm;

  const {
    data: userBalanceData,
    isLoading: isLoadingUserBalanceData,
    refetch: refetchUserBalance,
  } = useBalance({
    address: userAddress,
    token: address,
    chainId,
  });

  const { data: userAlpBalanceData } = useBalance({
    address: userAddress,
    token: alpAddress,
    chainId,
    watch: true,
    staleTime: 3000,
  });

  const { data: totalAmountData } = useContractRead({
    address: alpAddress,
    abi: ALP_ABI,
    chainId,
    functionName: 'getTotalPooled',
    watch: true,
    staleTime: 3000,
  });

  const { data: borrowedAmountData } = useContractRead({
    address: alpAddress,
    abi: ALP_ABI,
    chainId,
    functionName: '_positionBalances',
    watch: true,
    staleTime: 3000,
  });

  const { data: userSharesData } = useContractRead({
    address: alpAddress,
    abi: ALP_ABI,
    chainId,
    functionName: 'getSharesByWithdrow',
    args: [userAlpBalanceData?.value],
    watch: true,
    staleTime: 3000,
  });

  const { data: totalSharesData } = useContractRead({
    address: alpAddress,
    abi: ALP_ABI,
    chainId,
    functionName: 'getTotalShares',
    watch: true,
    staleTime: 3000,
  });

  useEffect(() => {
    refetchUserBalance?.();
  }, [amount, approvedAmount, isUserConnected, isWrongNetwork]);

  const handleChange = (field: PoolField, value: PoolFieldValue) => {
    updatePoolValues({ field, value });
  };

  const userBalance = convertFormattedValue(userBalanceData?.formatted);
  const userAlpBalance = roundNumber(convertFormattedValue(userAlpBalanceData?.formatted), 6);
  const totalAmount = +convertBigIntToNumber(totalAmountData, decimals).toFixed(0);
  const borrowedAmount = +convertBigIntToNumber(borrowedAmountData, decimals).toFixed(0);
  const userShares = performSharesValue(totalSharesData, userSharesData);
  const availableAmount = totalAmount - borrowedAmount;
  const isLowBalance = isUserConnected && !isWrongNetwork && !isLoadingUserBalanceData && amount > userBalance;

  const isDisabledDeposit = () =>
    amount > userBalance || amount > approvedAmount || amount === 0 || !isUserConnected || isWrongNetwork;

  const isDisabledWithdraw = () => {
    const roundedAmount = roundNumber(amount, 6);
    const roundedBalance = roundNumber(userAlpBalance, 6);

    return roundedAmount === 0 || roundedBalance < roundedAmount || !isUserConnected || isWrongNetwork;
  };

  return (
    <Flex gap={2} flexDirection="column">
      <ControlsWrap
        renderSelect={
          <Select
            items={poolTokensValues}
            value={poolForm}
            onChange={(value) => handleChange('token', value as PoolFieldValue)}
          />
        }
        renderInput={
          <Input
            type="number"
            value={`${poolForm.amountStr}`}
            onChange={(value) => handleChange('amount', value)}
            error={isLowBalance}
          />
        }
      />

      {isLowBalance && <PoolLowBalanceError balance={userBalance} symbol={symbol} />}

      <Flex gap={2}>
        <DepositButtonContainer isDisabled={isDisabledDeposit()} />
        {userAlpBalance > 0 && (
          <WithdrawButtonContainer isDisabled={isDisabledWithdraw()} isLowPoolAmount={availableAmount < amount} />
        )}
      </Flex>

      <PoolInfo {...{ totalAmount, availableAmount, borrowedAmount, symbol }} />

      <PoolPosition balance={userAlpBalance} shares={userShares} symbol={alpSymbol} />

      {!isUserConnected || isWrongNetwork ? (
        <ConnectButton fullWidth />
      ) : (
        <PoolApproveWrap ApprovedTokensProps={{ value: approvedAmount, symbol, hasTooltip: false }}>
          <ApproveTokenButtonContainer />
        </PoolApproveWrap>
      )}
    </Flex>
  );
};

export default PoolContentContainer;
