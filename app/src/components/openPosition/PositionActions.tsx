import { FC, ReactNode } from 'react';
import Flex from '@mui/material/Stack';

import ApprovedTokens, { ApprovedTokensProps } from '../common/ApprovedTokens';

type PositionActionsProps = {
  ApprovedTokensProps: ApprovedTokensProps;
  children: ReactNode;
};

const PositionActions: FC<PositionActionsProps> = ({ ApprovedTokensProps, children }): JSX.Element => (
  <Flex gap={1} flexDirection="column">
    <Flex gap={1}>{children}</Flex>
    <ApprovedTokens {...ApprovedTokensProps} />
  </Flex>
);

export default PositionActions;
