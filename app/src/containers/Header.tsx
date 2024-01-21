import { FC } from 'react';

import useTypedSelector from '@hooks/useTypedSelector';
import { MAIN_MENU } from '@constants/navigation';
import { Header } from '@components';

const HeaderContainer: FC = (): JSX.Element => {
  const { active } = useTypedSelector((state) => state.layout.header);

  return <Header MenuProps={{ active, menu: MAIN_MENU, marginLeft: -2 }} />;
};

export default HeaderContainer;
