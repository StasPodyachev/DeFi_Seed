import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '@models/state';
import { AddressType } from '@models';
import { isWrongNetwork, isTestNet } from '@utils/api/user';
import { SEPOLIA_CHAIN_ID, EMPTY_ADDRESS } from '@constants';

const initialState: UserState = {
  isUserInit: false,
  userAddress: EMPTY_ADDRESS,
  chainId: SEPOLIA_CHAIN_ID,
  isUserConnected: false,
  isTestNet: true,
  isWrongNetwork: false,
  isMetamask: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInitStatus(state, action: PayloadAction<boolean>) {
      state.isUserInit = action.payload;
    },
    setUserAddress(state, action: PayloadAction<AddressType>) {
      state.userAddress = action.payload;
    },
    setUserChainId(state, action: PayloadAction<number>) {
      state.chainId = action.payload;
      state.isWrongNetwork = isWrongNetwork(action.payload);
      state.isTestNet = isTestNet(action.payload);
    },
    setUserConnectStatus(state, action: PayloadAction<boolean>) {
      state.isUserConnected = action.payload;
    },
    setMetamaskStatus(state, action: PayloadAction<boolean>) {
      state.isMetamask = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
