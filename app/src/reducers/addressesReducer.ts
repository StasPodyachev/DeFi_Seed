import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressesState } from '@models/state';

const initialState: AddressesState = {
  list: {},
  loading: false,
  hasData: false,
  error: '',
};

export const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    getAddressesStart(state) {
      state.loading = true;
    },
    getAddressesSuccess(state, action: PayloadAction<AddressesState['list']>) {
      state.list = action.payload;
      state.hasData = true;
      state.loading = false;
      state.error = '';
    },
    getAddressesError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.hasData = false;
      state.error = action.payload;
    },
  },
});

export const addressesActions = addressesSlice.actions;

export const addressesReducer = addressesSlice.reducer;
