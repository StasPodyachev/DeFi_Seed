import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import Flex from '@mui/material/Stack';

import theme from '@theme';
import Tooltip from './Tooltip';

const Wrap = styled(Flex)({
  position: 'relative',
  minHeight: 64,
  paddingRight: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
});

const StyledTooltip = styled(Tooltip)({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(0.5),
  zIndex: 1,
});

type ControlsWrapProps = {
  tooltip?: string;
  renderSelect: ReactNode;
  renderInput: ReactNode;
  selectWidth?: string | number;
  inputWidth?: string | number;
};

const ControlsWrap: FC<ControlsWrapProps> = ({
  tooltip,
  renderSelect,
  renderInput,
  selectWidth = '50%',
  inputWidth = '50%',
}): JSX.Element => (
  <Wrap>
    <Flex width={selectWidth}>{renderSelect}</Flex>
    <Flex width={inputWidth}>{renderInput}</Flex>
    {tooltip && <StyledTooltip title={tooltip} placement="left" />}
  </Wrap>
);

export default ControlsWrap;
