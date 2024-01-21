import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutState } from '@models/state';

const initialState: LayoutState = {
  header: {
    active: '',
  },
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    changeHeaderItem(state, action: PayloadAction<string>) {
      state.header.active = action.payload;
    },
  },
});

export const layoutActions = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
