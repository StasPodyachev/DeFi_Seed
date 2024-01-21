import { FC, memo } from 'react';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';

import theme from '@theme';
import StyledText from '../common/text/StyledText';
import Tooltip from '../common/Tooltip';

const StyledTooltip = styled(Tooltip)({
  display: 'inline',
  marginLeft: theme.spacing(0.5),
  verticalAlign: 'text-top',
});

type MarginCallProps = {
  value: number;
  tokenSellSymbol: string;
  tokenBuySymbol: string;
  isLoading?: boolean;
};

const MarginCall: FC<MarginCallProps> = ({ value, tokenSellSymbol, tokenBuySymbol, isLoading }): JSX.Element => {
  if (isLoading) {
    return <Skeleton width="100%" height={20} />;
  }

  return (
    <div>
      <StyledText
        tid="POSITION.OPEN.MARGIN_CALL"
        values={{ value, tokenSellSymbol, tokenBuySymbol }}
        styledText="color"
        styledTextColor={theme.palette.error.main}
        variant="body1"
        color={theme.palette.grey[400]}
      />
      <StyledTooltip title="POSITION.OPEN.MARGIN_CALL_TOOLTIP" placement="left" />
    </div>
  );
};

export default memo(MarginCall);
