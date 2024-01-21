import { FC, memo } from 'react';
import styled from '@emotion/styled';

import theme from '@theme';
import Text from '../common/text/Text';
import Tooltip from '../common/Tooltip';

const StyledTooltip = styled(Tooltip)({
  display: 'inline',
  marginLeft: theme.spacing(0.5),
  verticalAlign: 'text-top',
});

export type LabelProps = {
  label: string;
  tooltip: string;
};

const Label: FC<LabelProps> = ({ label, tooltip }): JSX.Element => (
  <label>
    <Text tid={label} component="p" fontWeight={600} display="inline" />
    {tooltip && <StyledTooltip title={tooltip} />}
  </label>
);

export default memo(Label);
