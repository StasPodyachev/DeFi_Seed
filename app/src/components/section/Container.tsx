import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

import theme from '@theme';

const StyledWrap = styled('div')({
  width: '100%',
  minHeight: 'calc(100vh - 144px)',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.dark,

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
});

export type ContainerProps = {
  children: ReactNode;
};

const Container: FC<ContainerProps> = ({ children }): JSX.Element => <StyledWrap>{children}</StyledWrap>;

export default Container;
