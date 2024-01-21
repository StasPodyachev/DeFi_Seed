import { FC } from 'react';

import useActions from '@hooks/useActions';
import { DIALOGS } from '@constants';
import { UserBackButton } from '@components';

const UserBackContainer: FC = (): JSX.Element => {
  const { openDialog } = useActions();

  const handleClick = () => {
    openDialog({ name: DIALOGS.USER_BACK });
  };

  return <UserBackButton onClick={handleClick} />;
};

export default UserBackContainer;
