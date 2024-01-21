import { useEffect, useState } from 'react';

import useTypedSelector from '@hooks/useTypedSelector';
import { api } from '@services/request';
import { convertNumberToBigInt, convertToHex } from '@utils';
import { URLS } from '@constants/api';
import { EXCHANGERS } from '@constants/dictionaries';
import { SLIPPAGE, MAINNET_TOKENS, MAINNET_CHAI_ID } from '@constants';

type State = {
  data: null | { toAmount: string; tx: { data: string } };
  isLoading: boolean;
  error: string;
};

const initialState: State = {
  data: null,
  isLoading: false,
  error: '',
};

const useOneInchRate = () => {
  const [state, setState] = useState(initialState);
  const {
    addresses,
    user: { chainId, isTestNet },
    form: { positionForm },
  } = useTypedSelector((state) => state);
  const { tokenSell, tokenBuy, leverage, exchange } = positionForm;
  const oneInch = EXCHANGERS[2];

  useEffect(() => {
    if (exchange.value !== oneInch.value) {
      setState({ data: null, isLoading: false, error: '' });
      return;
    }

    const getCurrentChainId = () => (isTestNet ? MAINNET_CHAI_ID : chainId);
    const getCurrentTokenAddress = (token: typeof tokenSell | typeof tokenBuy) =>
      isTestNet ? MAINNET_TOKENS[token.symbol] : token.address;

    const config = {
      params: {
        chainId: getCurrentChainId(),
        src: getCurrentTokenAddress(tokenSell),
        dst: getCurrentTokenAddress(tokenBuy),
        amount: convertNumberToBigInt(tokenSell.amount * leverage, tokenSell.decimals),
        from: addresses.list[chainId].OneInchExchange,
        slippage: `${SLIPPAGE}`,
        disableEstimate: 'true',
      },
    };

    setState((prev) => ({ ...prev, isLoading: true }));

    api
      .get(URLS.ONE_INCH_SWAP, config)
      .then(({ data }) => {
        setState((prev) => ({
          ...prev,
          data: {
            ...data,
            tx: {
              ...data.tx,
              data: isTestNet ? `0x${convertToHex(data.toAmount)}` : data.tx.data,
            },
          },
          isLoading: false,
        }));
      })
      .catch((error) => {
        setState((prev) => ({ ...prev, error, isLoading: false }));
      });
  }, [tokenSell, tokenBuy.address, leverage, exchange.value]);

  return state;
};

export default useOneInchRate;
