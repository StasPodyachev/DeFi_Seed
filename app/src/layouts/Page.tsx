import { ReactNode } from 'react';

import UserAuthWrap from '@containers/UserAuthWrap';
import DialogsContainer from '@containers/Dialogs';
import UserBackContainer from '@containers/UserBack';
import { MAIN_CONTENT_ID } from '@constants';

type PageProps = {
  children: ReactNode;
};

const Page = ({ children }: PageProps): JSX.Element => (
  <UserAuthWrap>
    <main id={MAIN_CONTENT_ID}>
      {children}
      <UserBackContainer />
      <DialogsContainer />
    </main>
  </UserAuthWrap>
);

export default Page;
