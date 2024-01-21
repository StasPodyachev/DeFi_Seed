import { api } from '@services/request';
import { RootState, AppDispatch } from '@services/store';
import { addressesActions } from '@reducers/addressesReducer';
import { AddressType } from '@models';
import { getQueryParamsStr } from '@utils/url';
import { URLS } from '@constants/api';

const { getAddressesStart, getAddressesSuccess, getAddressesError } = addressesActions;

export const getAddresses = (userAddress?: AddressType) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { loading } = getState().addresses;

  if (loading) {
    return Promise.resolve();
  }

  dispatch(getAddressesStart());

  const url = `${URLS.ADDRESSES}${userAddress ? `?${getQueryParamsStr({ address: userAddress })}` : ''}`;

  return api
    .get(url)
    .then(({ data }) => {
      dispatch(getAddressesSuccess(data));
    })
    .catch((data) => {
      dispatch(getAddressesError(data?.response?.data?.error));
    });
};
