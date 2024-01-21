import { Fragment, FC, useState, MouseEvent, memo } from 'react';
import styled from '@emotion/styled';
import Drawer from '@mui/material/Drawer';
import ButtonBase from '@mui/material/ButtonBase';
import Flex from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';

import theme from '@theme';
import { MainMenu } from '@models';
import MenuItem from './HeaderMenu/MenuItem';
import CloseButton from '../common/buttons/CloseButton';
import Socials from '../common/Socials';

const StyledMenuButton = styled(ButtonBase)({
  [theme.breakpoints.up(1100)]: {
    display: 'none',
  },
});

const StyledList = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
});

const StyledCloseButton = styled(CloseButton)({
  top: theme.spacing(3),
  right: theme.spacing(3),
});

type MobileMenuProps = {
  active: string;
  menu: MainMenu;
};

const MobileMenu: FC<MobileMenuProps> = ({ active, menu }): JSX.Element => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <Fragment>
      <StyledMenuButton onClick={toggleDrawer}>
        <MenuIcon />
      </StyledMenuButton>
      <Drawer open={open} onClose={toggleDrawer}>
        <StyledCloseButton onClick={toggleDrawer} />
        <Flex component="nav" height="100%" alignItems="center">
          <StyledList>
            {menu.map((item) => (
              <MenuItem key={item.name} {...item} isActive={active === item.name} isBg={false} variant="h6" />
            ))}
          </StyledList>
        </Flex>
        <Socials />
      </Drawer>
    </Fragment>
  );
};

export default memo(MobileMenu);
