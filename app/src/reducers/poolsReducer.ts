import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PoolsApi } from '@models/api';
import { PoolsState } from '@models/state';
import { performPools } from '@utils/api/pools';

const initialState: PoolsState = {
  list: [],
  loading: false,
  hasData: false,
  error: '',
  chainId: 0,
};

export const poolsSlice = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    getPoolsStart(state) {
      state.loading = true;
    },
    getPoolsSuccess(state, action: PayloadAction<{ data: PoolsApi; chainId: number }>) {
      state.list = performPools(action.payload.data);
      state.hasData = true;
      state.loading = false;
      state.error = '';
      state.chainId = action.payload.chainId;
    },
    getPoolsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.hasData = false;
      state.error = action.payload;
    },
    resetPools() {
      return { ...initialState };
    },
  },
});

export const poolsActions = poolsSlice.actions;

export const poolsReducer = poolsSlice.reducer;
