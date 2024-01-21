import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PositionAPI } from '@models/api';
import { PositionsState } from '@models/state';
import { performPositions, getOpenedPositions, getClosedPositions } from '@utils/api/positions';

const initialState: PositionsState = {
  openedPositions: [],
  closedPositions: [],
  loading: false,
  hasData: false,
  error: '',
  chainId: 0,
};

export const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    getPositionsStart(state) {
      state.loading = true;
    },
    getPositionsSuccess(state, action: PayloadAction<{ data: PositionAPI[]; chainId: number }>) {
      const positions = performPositions(action.payload.data, action.payload.chainId);

      state.openedPositions = getOpenedPositions(positions);
      state.closedPositions = getClosedPositions(positions);
      state.hasData = true;
      state.loading = false;
      state.error = '';
      state.chainId = action.payload.chainId;
    },
    getPositionsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.hasData = false;
      state.error = action.payload;
    },
    resetPositions() {
      return { ...initialState };
    },
  },
});

export const positionsActions = positionsSlice.actions;

export const positionsReducer = positionsSlice.reducer;
