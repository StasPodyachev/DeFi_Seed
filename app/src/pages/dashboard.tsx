import { Page, BaseLayout } from '@layouts';
import DashboardContainer from '@containers/Dashboard';
import PendingTransactions from '@containers/Transactions';
import { META_ID } from '@constants';
import { PageContent } from '@components';
import Head from './_head';

const DashboardPage = (): JSX.Element => (
  <Page>
    <Head id={META_ID.DASHBOARD} />
    <BaseLayout>
      <PendingTransactions showBanner />
      <PageContent title="DASHBOARD.TITLE">
        <DashboardContainer />
      </PageContent>
    </BaseLayout>
  </Page>
);

DashboardPage.getInitialProps = async () => {
  return {};
};

export default DashboardPage;
