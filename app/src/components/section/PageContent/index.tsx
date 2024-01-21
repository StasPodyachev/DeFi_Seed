import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

import theme from '@theme';
import PageTitle, { PageTitleProps } from './PageTitle';

const StyledWrap = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  maxWidth: 375,
  margin: theme.spacing(0, 'auto'),

  [theme.breakpoints.down('xs')]: {
    maxWidth: 'initial',
  },
});

export type PageContentProps = {
  title: string;
  TitleProps?: Omit<PageTitleProps, 'title'>;
  children: ReactNode;
};

const PageContent: FC<PageContentProps> = ({ title, TitleProps = {}, children }): JSX.Element => (
  <StyledWrap>
    <PageTitle title={title} {...TitleProps} />
    {children}
  </StyledWrap>
);

export default PageContent;
