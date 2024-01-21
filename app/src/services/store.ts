import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@reducers/userReducer';
import { addressesReducer } from '@reducers/addressesReducer';
import { formReducer } from '@reducers/formReducer';
import { tokensReducer } from '@reducers/tokensReducer';
import { poolsReducer } from '@reducers/poolsReducer';
import { positionsReducer } from '@reducers/positionsReducer';
import { dialogsReducer } from '@reducers/dialogsReducer';
import { layoutReducer } from '@reducers/layoutReducer';
import { transactionsReducer } from '@reducers/transactionsReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    addresses: addressesReducer,
    form: formReducer,
    tokens: tokensReducer,
    pools: poolsReducer,
    positions: positionsReducer,
    dialogs: dialogsReducer,
    layout: layoutReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
