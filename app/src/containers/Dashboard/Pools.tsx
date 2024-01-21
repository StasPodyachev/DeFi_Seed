import { FC, useEffect } from 'react';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { ELEMENT_IDS } from '@constants';
import { DashboardPools, ValuesListLoader } from '@components';
import PoolBalanceContainer from './PoolBalance';

const PoolsContainer: FC = (): JSX.Element => {
  const { chainId } = useTypedSelector((state) => state.user);
  const { list, loading } = useTypedSelector((state) => state.pools);
  const { getPools } = useActions();

  useEffect(() => {
    getPools(chainId);
  }, [chainId]);

  if (loading) {
    return <ValuesListLoader />;
  }

  return <DashboardPools ListProps={{ id: ELEMENT_IDS.DASHBOARD_POOLS, list, ItemComponent: PoolBalanceContainer }} />;
};

export default PoolsContainer;
