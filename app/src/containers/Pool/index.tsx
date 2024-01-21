import { FC, useEffect } from 'react';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { withError } from '@hocs';
import { HEADER_ITEMS } from '@constants/navigation';
import { PoolLoader } from '@components';
import PoolContentContainer from './PoolContent';

const PoolContainer: FC = (): JSX.Element => {
  const { chainId } = useTypedSelector((state) => state.user);
  const {
    loading: isLoadingTokens,
    hasData: hasTokens,
    chainId: tokensChainId,
  } = useTypedSelector((state) => state.tokens);
  const { changeHeaderItem, getTokens } = useActions();

  useEffect(() => {
    changeHeaderItem(HEADER_ITEMS.POOL);
  }, []);

  useEffect(() => {
    getTokens(chainId);
  }, [chainId]);

  if (!hasTokens || isLoadingTokens || chainId !== tokensChainId) {
    return <PoolLoader />;
  }

  return <PoolContentContainer />;
};

export default withError(PoolContainer);
