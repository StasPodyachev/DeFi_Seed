import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionsState } from '@models/state';
import { AddressType } from '@models';
import { PositionForm, PoolForm } from '@models/form';
import { EMPTY_ADDRESS } from '@constants';

const initialState: TransactionsState = {
  openPositionTxAddress: EMPTY_ADDRESS,
  openPositionData: {} as PositionForm,
  closePositionTxAddress: EMPTY_ADDRESS,
  depositPoolTxAddress: EMPTY_ADDRESS,
  depositPoolData: {} as PoolForm,
  withdrawPoolTxAddress: EMPTY_ADDRESS,
  withdrawPoolData: {} as PoolForm,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setOpenPositionTxAddress(state, action: PayloadAction<AddressType>) {
      state.openPositionTxAddress = action.payload;
    },
    setOpenPositionData(state, action: PayloadAction<PositionForm>) {
      state.openPositionData = action.payload;
    },
    setClosePositionTxAddress(state, action: PayloadAction<AddressType>) {
      state.closePositionTxAddress = action.payload;
    },
    setDepositPoolTxAddress(state, action: PayloadAction<AddressType>) {
      state.depositPoolTxAddress = action.payload;
    },
    setDepositPoolData(state, action: PayloadAction<PoolForm>) {
      state.depositPoolData = action.payload;
    },
    setWithdrawPoolTxAddress(state, action: PayloadAction<AddressType>) {
      state.withdrawPoolTxAddress = action.payload;
    },
    setWithdrawPoolData(state, action: PayloadAction<PoolForm>) {
      state.withdrawPoolData = action.payload;
    },
  },
});

export const transactionsActions = transactionsSlice.actions;

export const transactionsReducer = transactionsSlice.reducer;
