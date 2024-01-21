import { apollo, gql } from '@services/request';
import { RootState, AppDispatch } from '@services/store';
import { positionsActions } from '@reducers/positionsReducer';
import { AddressType } from '@models';
import { getApolloUrl } from '@constants/api';

const { getPositionsStart, getPositionsSuccess, getPositionsError, resetPositions } = positionsActions;

export { resetPositions };

export const getPositions =
  (chainId: number, address: AddressType, force?: boolean) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { positions } = getState();

    if ((positions.loading || chainId === positions.chainId) && !force) {
      return Promise.resolve();
    }

    dispatch(getPositionsStart());

    apollo.cache.reset();
    apollo.setLink(getApolloUrl(chainId));

    return apollo
      .query({
        query: gql`
          query Positions {
            positions (
              where: { trader: "${address}"}) {
                id
                timestamp
                leverage
                amount
                amountOut
                status
                txOpen
                txClose
                txLiquidation
                dexType
                tokenSell {
                  id
                  name
                  symbol
                  decimals
                }
                tokenBuy {
                  id
                  name
                  symbol
                  decimals
                }
              }
            }
      `,
      })
      .then(({ data }) => {
        dispatch(getPositionsSuccess({ data: data.positions, chainId }));
      })
      .catch((e) => {
        dispatch(getPositionsError(e.message));
      });
  };
