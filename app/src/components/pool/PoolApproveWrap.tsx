import { FC, ReactNode } from 'react';
import Flex from '@mui/material/Stack';

import ApprovedTokens, { ApprovedTokensProps } from '../common/ApprovedTokens';

type PoolApproveWrapProps = {
  ApprovedTokensProps: ApprovedTokensProps;
  children: ReactNode;
};

const PoolApproveWrap: FC<PoolApproveWrapProps> = ({ ApprovedTokensProps, children }): JSX.Element => (
  <Flex gap={1} flexDirection="column">
    {children}
    <ApprovedTokens {...ApprovedTokensProps} />
  </Flex>
);

export default PoolApproveWrap;
