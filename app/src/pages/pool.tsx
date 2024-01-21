import { Page, BaseLayout } from '@layouts';
import PoolContainer from '@containers/Pool';
import PendingTransactions from '@containers/Transactions';
import { META_ID } from '@constants';
import { PageContent } from '@components';
import Head from './_head';

const PoolPage = (): JSX.Element => (
  <Page>
    <Head id={META_ID.POOL} />
    <BaseLayout>
      <PendingTransactions />
      <PageContent title="POOL.TITLE">
        <PoolContainer />
      </PageContent>
    </BaseLayout>
  </Page>
);

PoolPage.getInitialProps = async () => {
  return {};
};

export default PoolPage;
