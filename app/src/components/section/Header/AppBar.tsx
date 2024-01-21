import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

import theme from '@theme';

const StyledWrap = styled('header')({
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
  minHeight: '72px',
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  backgroundColor: theme.palette.primary.dark,
});

export type AppBarProps = {
  children: ReactNode;
};

const AppBar: FC<AppBarProps> = ({ children }): JSX.Element => <StyledWrap>{children}</StyledWrap>;

export default AppBar;
