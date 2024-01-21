import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TokensApi } from '@models/api';
import { TokensState } from '@models/state';
import {
  performTokens,
  performFaucetTokensLoading,
  performFaucetTokensSuccess,
  performFaucetTokensError,
} from '@utils/api/tokens';

const initialState: TokensState = {
  list: [],
  loading: false,
  hasData: false,
  error: '',
  chainId: 0,
  faucetToken: {
    status: 0,
    loading: false,
    hasData: false,
    error: '',
  },
  faucetTokens: {},
};

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    getTokensStart(state) {
      state.loading = true;
    },
    getTokensSuccess(state, action: PayloadAction<{ data: TokensApi; chainId: number }>) {
      state.list = performTokens(action.payload.data, action.payload.chainId);
      state.hasData = true;
      state.loading = false;
      state.error = '';
      state.chainId = action.payload.chainId;
    },
    getTokensError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.hasData = false;
      state.error = action.payload;
    },
    resetTokens(state) {
      state.list = initialState.list;
      state.hasData = initialState.hasData;
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.chainId = initialState.chainId;
    },
    getFaucetTokenStart(state, action: PayloadAction<string>) {
      state.faucetToken = {
        symbol: action.payload,
        ...performFaucetTokensLoading(),
      };
    },
    getFaucetTokenSuccess(state, action: PayloadAction<string>) {
      state.faucetToken = {
        symbol: action.payload,
        ...performFaucetTokensSuccess(),
      };
    },
    getFaucetTokenError(state, action: PayloadAction<{ symbol: string; status: number; error: string }>) {
      state.faucetToken = {
        symbol: action.payload.symbol,
        ...performFaucetTokensError(action.payload.status, action.payload.error),
      };
    },
    resetFaucetToken(state) {
      state.faucetToken = { ...initialState.faucetToken };
    },
    getFaucetTokensStart(state, action: PayloadAction<string>) {
      state.faucetTokens[action.payload] = performFaucetTokensLoading();
    },
    getFaucetTokensSuccess(state, action: PayloadAction<string>) {
      state.faucetTokens[action.payload] = performFaucetTokensSuccess();
    },
    getFaucetTokensError(state, action: PayloadAction<{ symbol: string; status: number; error: string }>) {
      state.faucetTokens[action.payload.symbol] = performFaucetTokensError(action.payload.status, action.payload.error);
    },
    resetFaucetTokens(state) {
      state.faucetTokens = {};
    },
  },
});

export const tokensActions = tokensSlice.actions;

export const tokensReducer = tokensSlice.reducer;
