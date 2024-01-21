import { Fragment, ReactNode } from 'react';

import Header from '@containers/Header';
import { Container, Footer } from '@components';

type BaseLayoutProps = {
  children: ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutProps): JSX.Element => (
  <Fragment>
    <Header />
    <Container>{children}</Container>
    <Footer />
  </Fragment>
);

export default BaseLayout;
