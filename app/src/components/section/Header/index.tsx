import { FC } from 'react';
import Flex from '@mui/material/Stack';

import AppBar from './AppBar';
import Toolbar from './Toolbar';
import Logo from '../../common/Logo';
import ConnectButton from '../../common/buttons/ConnectButton';
import HeaderMenu, { HeaderMenuProps } from '../../menu/HeaderMenu';
import MobileMenu from '../../menu/MobileMenu';

type HeaderProps = {
  MenuProps: HeaderMenuProps;
};

const Header: FC<HeaderProps> = ({ MenuProps }): JSX.Element => (
  <AppBar>
    <Toolbar>
      <Logo />
      <HeaderMenu {...MenuProps} />
      <Flex gap={1} position="absolute" top={0} right={0}>
        <ConnectButton />
        <MobileMenu {...MenuProps} />
      </Flex>
    </Toolbar>
  </AppBar>
);

export default Header;
