import { apollo, gql, api } from '@services/request';
import { RootState, AppDispatch } from '@services/store';
import { tokensActions } from '@reducers/tokensReducer';
import { formActions } from '@reducers/formReducer';
import { AddressType, ChainParams } from '@models';
import { TokensApi } from '@models/api';
import { getApolloUrl, URLS } from '@constants/api';

const {
  getTokensStart,
  getTokensSuccess,
  getTokensError,
  resetTokens,
  getFaucetTokenStart,
  getFaucetTokenSuccess,
  getFaucetTokenError,
  getFaucetTokensStart,
  getFaucetTokensSuccess,
  getFaucetTokensError,
  resetFaucetToken,
  resetFaucetTokens,
} = tokensActions;
const { getTokensValuesSuccess } = formActions;

export { resetTokens, resetFaucetTokens, resetFaucetToken };

export const getTokens = (chainId: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { tokens } = getState();

  if (tokens.loading || chainId === tokens.chainId) {
    return Promise.resolve();
  }

  dispatch(getTokensStart());

  apollo.cache.reset();
  apollo.setLink(getApolloUrl(chainId));

  return apollo
    .query({
      query: gql`
        query {
          alps {
            name
            id
            isActive
            token {
              id
              name
              symbol
              decimals
            }
            availableTokens {
              id
              name
              symbol
              decimals
            }
          }
        }
      `,
    })
    .then(({ data: { alps } }: { data: { alps: TokensApi } }) => {
      const tokens = alps.filter((i) => i.isActive !== false);

      dispatch(getTokensSuccess({ data: tokens, chainId }));
      dispatch(getTokensValuesSuccess({ data: tokens, chainId }));
    })
    .catch((e) => {
      dispatch(getTokensError(e.message));
    });
};

export const addTokenToMetamask =
  ({ address, symbol, decimals }: { address: AddressType; symbol: string; decimals: number }) =>
  async () => {
    // @ts-ignore
    const ethereum = window?.ethereum;

    if (!ethereum) {
      return Promise.reject();
    }

    try {
      await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address,
            symbol,
            decimals,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

export const getFaucetToken =
  (address: AddressType, symbol: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      user: { userAddress, chainId },
    } = getState();

    dispatch(getFaucetTokenStart(symbol));

    const payload = {
      wallet: userAddress,
      tokens: [address],
      chainId,
    };

    return api
      .post(URLS.FAUCET, JSON.stringify(payload))
      .then(({ status }) => {
        if (status === 200) {
          dispatch(getFaucetTokenSuccess(symbol));
        }
      })
      .catch(({ response }) => {
        const errorMessage = response?.data?.error || 'server error';
        dispatch(getFaucetTokenError({ symbol, status: response.status, error: errorMessage }));
      });
  };

export const getFaucetTokens = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const {
    user: { userAddress, chainId },
    tokens: { list },
  } = getState();

  return Promise.allSettled(
    list.map(({ address, symbol }) => {
      dispatch(getFaucetTokensStart(symbol));

      const payload = {
        wallet: userAddress,
        tokens: [address],
        chainId,
      };

      return api
        .post(URLS.FAUCET, JSON.stringify(payload))
        .then(({ status }) => {
          if (status === 200) {
            dispatch(getFaucetTokensSuccess(symbol));
          }
        })
        .catch(({ response }) => {
          const errorMessage = response?.data?.error || 'server error';
          dispatch(getFaucetTokensError({ status: response.status, symbol, error: errorMessage }));
        });
    }),
  );
};

export const addChain = (params: ChainParams) => async () => {
  // @ts-ignore
  const ethereum = window?.ethereum;

  if (!ethereum) {
    return Promise.reject();
  }

  try {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [params],
    });
  } catch (error) {
    console.error('Error adding network:', error);
  }
};
