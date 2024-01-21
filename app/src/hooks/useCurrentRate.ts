import { useContractRead } from 'wagmi';

import UNISWAP_RATE_ABI from '@contracts/abi/UniswapExchange.json';
import CURVE_RATE_ABI from '@contracts/abi/CurveExchange.json';
import useTypedSelector from '@hooks/useTypedSelector';
import { convertNumberToBigInt } from '@utils';
import { Position } from '@models/positions';
import { EXCHANGERS } from '@constants/dictionaries';

type UseCurrentRate = Pick<Position, 'tokenSellAddress' | 'tokenBuyAddress' | 'tokenBuyDecimals' | 'exchangeValue'>;

const useCurrentRate = ({ tokenSellAddress, tokenBuyAddress, tokenBuyDecimals, exchangeValue }: UseCurrentRate) => {
  const { chainId } = useTypedSelector((state) => state.user);
  const addresses = useTypedSelector((state) => state.addresses.list[chainId]);
  const [_, curve] = EXCHANGERS;

  const config = {
    args: [tokenBuyAddress, tokenSellAddress, convertNumberToBigInt(1, tokenBuyDecimals)],
    chainId,
    functionName: 'getAmountOut',
  };

  if (curve.value === exchangeValue) {
    return useContractRead({
      ...config,
      address: addresses?.CurveExchange,
      abi: CURVE_RATE_ABI,
    });
  }

  return useContractRead({
    ...config,
    address: addresses?.UniswapExchange,
    abi: UNISWAP_RATE_ABI,
  });
};

export default useCurrentRate;
