import { FC } from 'react';
import Flex from '@mui/material/Stack';

import Text from '../common/text/Text';
import ConnectButton from '../common/buttons/ConnectButton';

const DashboardNoConnectedWallet: FC = (): JSX.Element => (
  <Flex gap={2} flexDirection="column">
    <Text tid="DASHBOARD.NO_CONNECTED_WALLET" variant="body1" align="center" />
    <ConnectButton fullWidth />
  </Flex>
);

export default DashboardNoConnectedWallet;
