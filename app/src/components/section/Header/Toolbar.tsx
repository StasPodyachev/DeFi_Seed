import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import Flex from '@mui/material/Stack';

const StyledWrap = styled(Flex)({
  position: 'relative',
  width: 'inherit',
});

export type ToolbarProps = {
  children: ReactNode;
};

const Toolbar: FC<ToolbarProps> = ({ children }): JSX.Element => (
  <StyledWrap gap={1} alignItems="center">
    {children}
  </StyledWrap>
);

export default Toolbar;
