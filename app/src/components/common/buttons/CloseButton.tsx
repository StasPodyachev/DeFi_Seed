import { FC } from 'react';
import styled from '@emotion/styled';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import Close from '@mui/icons-material/Close';

const StyledButton = styled(ButtonBase)({
  position: 'absolute',
  top: 8,
  right: 8,
});

const CloseButton: FC<ButtonBaseProps> = (props): JSX.Element => (
  <StyledButton {...props}>
    <Close />
  </StyledButton>
);

export default CloseButton;
