import { TokensApi, AvailableTokensApi } from '@models/api';
import { Tokens, AvailableTokens } from '@models/tokens';
import { getStaticAssetPath } from '@utils';
import { FAUCET_ERROR } from '@constants';
import { getTokenSymbol } from './handlers';

const performAvailableTokens = (raw: AvailableTokensApi, chainId: number): AvailableTokens =>
  raw.map((item) => {
    const symbol = getTokenSymbol(item.symbol, item.id, chainId);

    return {
      address: item.id,
      symbol,
      iconUrl: getStaticAssetPath(`${symbol}.svg`, 'images/tokens'),
      decimals: +item.decimals,
    };
  });

export const performTokens = (raw: TokensApi, chainId: number): Tokens =>
  raw.map((item) => {
    const symbol = getTokenSymbol(item.token.symbol, item.token.id, chainId);

    return {
      alpAddress: item.id,
      alpSymbol: item.name,
      iconUrl: getStaticAssetPath(`${symbol}.svg`, 'images/tokens'),
      symbol,
      address: item.token.id,
      decimals: +item.token.decimals,
      availableTokens: performAvailableTokens(item.availableTokens, chainId),
    };
  });

export const performFaucetErrorMessage = (raw?: string) => {
  if (!raw) {
    return '';
  }

  if (raw.includes('Many request for last 24 hours')) {
    return FAUCET_ERROR.RECEIVED;
  }
  if (raw.includes('Failed to send Ether')) {
    return FAUCET_ERROR.NO_NATIVE_TOKENS;
  }
  if (raw.includes('transfer to the zero address')) {
    return FAUCET_ERROR.ZERO_ADDRESS;
  }
  if (raw.includes('transfer amount exceeds balance')) {
    return FAUCET_ERROR.NO_FAUCET_TOKENS;
  }
  return FAUCET_ERROR.ERROR;
};

export const performFaucetTokensLoading = () => ({
  status: 0,
  loading: true,
  hasData: false,
  error: '',
});

export const performFaucetTokensSuccess = () => ({
  status: 200,
  loading: false,
  hasData: true,
  error: '',
});

export const performFaucetTokensError = (status: number, error: string) => ({
  status,
  loading: false,
  hasData: true,
  error: performFaucetErrorMessage(error),
});
