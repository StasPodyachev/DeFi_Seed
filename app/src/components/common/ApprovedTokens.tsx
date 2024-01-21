import { FC, memo } from 'react';
import Flex from '@mui/material/Stack';

import theme from '@theme';
import StyledText from './text/StyledText';
import Tooltip from './Tooltip';

export type ApprovedTokensProps = {
  value: number;
  symbol: string;
  hasTooltip?: boolean;
};

const ApprovedTokens: FC<ApprovedTokensProps> = ({ value = 0, symbol, hasTooltip = true }): JSX.Element => (
  <Flex gap={0.5} justifyContent="center" alignItems="center">
    <StyledText
      tid="COMMON.APPROVE_TOKEN_VALUE"
      values={{ value, symbol }}
      styledText="color"
      styledTextColor={value === 0 ? theme.palette.error.main : theme.palette.success.main}
      variant="body1"
      color={theme.palette.grey[400]}
    />
    {hasTooltip && <Tooltip title="COMMON.APPROVE_TOKEN_TOOLTIP" placement="left" />}
  </Flex>
);

export default memo(ApprovedTokens);
