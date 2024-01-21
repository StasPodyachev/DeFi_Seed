import { FC, useEffect } from 'react';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { ValuesListLoader, DashboardPositions } from '@components';
import ClosePositionButtonContainer from './ClosePositionButton';
import PositionProfitContainer from './PositionProfit';
import PositionCurrentRateContainer from './PositionCurrentRate';
import PositionCurrentTokenSellContainer from './PositionCurrentTokenSell';

const PositionsContainer: FC = (): JSX.Element => {
  const { userAddress, chainId } = useTypedSelector((state) => state.user);
  const { openedPositions, closedPositions, hasData } = useTypedSelector((state) => state.positions);
  const { getPositions } = useActions();

  useEffect(() => {
    getPositions(chainId, userAddress);
  }, [chainId, userAddress]);

  if (!hasData) {
    return <ValuesListLoader />;
  }

  return (
    <DashboardPositions
      chainId={chainId}
      openedPositions={openedPositions}
      closedPositions={closedPositions}
      renderClosePositionButton={(position) => <ClosePositionButtonContainer {...position} />}
      renderProfit={(position) => <PositionProfitContainer {...position} />}
      renderCurrentRate={(position) => <PositionCurrentRateContainer {...position} />}
      renderCurrentTokenSell={(position) => <PositionCurrentTokenSellContainer {...position} />}
    />
  );
};

export default PositionsContainer;
