import { FC, memo } from 'react';
import styled from '@emotion/styled';

import theme from '@theme';
import { MainMenu } from '@models';
import MenuItem from './MenuItem';

type StyledNavigationProps = {
  theme: {
    marginLeft: number | undefined;
  };
};

const StyledNavigation = styled('nav')<StyledNavigationProps>(({ theme: { marginLeft } }) => ({
  display: 'flex',
  justifyContent: 'center',
  flex: 1,
  marginLeft: theme.spacing(marginLeft || 0),

  [theme.breakpoints.down(1100)]: {
    visibility: 'hidden',
    overflow: 'auto',
  },
}));

const StyledList = styled('ul')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export type HeaderMenuProps = {
  active: string;
  menu: MainMenu;
  marginLeft?: number;
};

const HeaderMenu: FC<HeaderMenuProps> = ({ active, menu, marginLeft }): JSX.Element => (
  <StyledNavigation theme={{ marginLeft }}>
    <StyledList>
      {menu.map((item) => (
        <MenuItem key={item.name} {...item} isActive={active === item.name} />
      ))}
    </StyledList>
  </StyledNavigation>
);

export default memo(HeaderMenu);
