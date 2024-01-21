import { Page, BaseLayout } from '@layouts';
import { META_ID } from '@constants';
import OpenPositionContainer from '@containers/OpenPosition';
import PendingTransactions from '@containers/Transactions';
import { PageContent } from '@components';
import Head from './_head';

const HomePage = (): JSX.Element => (
  <Page>
    <Head id={META_ID.OPEN_POSITION} />
    <BaseLayout>
      <PendingTransactions />
      <PageContent title="POSITION.OPEN.TITLE" TitleProps={{ tooltip: 'POSITION.OPEN.TITLE_TOOLTIP' }}>
        <OpenPositionContainer />
      </PageContent>
    </BaseLayout>
  </Page>
);

HomePage.getInitialProps = async () => {
  return {};
};

export default HomePage;
