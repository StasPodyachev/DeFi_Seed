import { FC } from 'react';

import theme from '@theme';
import SafeText from '../../../common/text/SafeText';

type PositionProfitProps = {
  roi: number;
  pnl: number;
};

const PositionProfit: FC<PositionProfitProps> = ({ roi, pnl }): JSX.Element => (
  <SafeText
    content={`${pnl.toFixed(2)}$ (${roi.toFixed(2)}%)`}
    variant="subtitle2"
    flex={1}
    textAlign="right"
    color={pnl >= 0 ? theme.palette.success.main : theme.palette.error.main}
  />
);

export default PositionProfit;
