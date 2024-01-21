import { FC, memo } from 'react';
import styled from '@emotion/styled';
import TooltipComponent, { TooltipProps as TooltipComponentProps } from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import theme from '@theme';
import StyledText from './text/StyledText';

const StyledIcon = styled(InfoOutlinedIcon)({
  '&:hover': {
    cursor: 'help',
  },
});

type TooltipProps = {
  title: string;
  className?: string;
} & Pick<TooltipComponentProps, 'placement'>;

const Tooltip: FC<TooltipProps> = ({ title, placement = 'bottom', className = '' }): JSX.Element => (
  <TooltipComponent
    title={<StyledText tid={title} styledText="bold" variant="subtitle2" color={theme.palette.grey[400]} />}
    placement={placement}
    className={className}
  >
    <StyledIcon fontSize="small" htmlColor={theme.palette.grey[400]} />
  </TooltipComponent>
);

export default memo(Tooltip);
