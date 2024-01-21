import { FC, useEffect } from 'react';
import Flex from '@mui/material/Stack';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { withError } from '@hocs';
import { HEADER_ITEMS } from '@constants/navigation';
import { DashboardNoConnectedWallet } from '@components';
import PositionsContainer from './Positions';
import PoolsContainer from './Pools';

const DashboardContainer: FC = (): JSX.Element => {
  const { isUserConnected, isWrongNetwork } = useTypedSelector((state) => state.user);
  const { changeHeaderItem } = useActions();

  useEffect(() => {
    changeHeaderItem(HEADER_ITEMS.DASHBOARD);
  }, []);

  if (!isUserConnected || isWrongNetwork) {
    return <DashboardNoConnectedWallet />;
  }

  return (
    <Flex gap={3} flexDirection="column">
      <PositionsContainer />
      <PoolsContainer />
    </Flex>
  );
};

export default withError(DashboardContainer);
