import { apollo, gql } from '@services/request';
import { RootState, AppDispatch } from '@services/store';
import { poolsActions } from '@reducers/poolsReducer';
import { getApolloUrl } from '@constants/api';

const { getPoolsStart, getPoolsSuccess, getPoolsError, resetPools } = poolsActions;

export { resetPools };

export const getPools = (chainId: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { pools } = getState();

  if (pools.loading || chainId === pools.chainId) {
    return Promise.resolve();
  }

  dispatch(getPoolsStart());

  apollo.cache.reset();
  apollo.setLink(getApolloUrl(chainId));

  return apollo
    .query({
      query: gql`
        query {
          alps {
            name
            id
          }
        }
      `,
    })
    .then(({ data }) => {
      dispatch(getPoolsSuccess({ data: data.alps, chainId }));
    })
    .catch((e) => {
      dispatch(getPoolsError(e.message));
    });
};
