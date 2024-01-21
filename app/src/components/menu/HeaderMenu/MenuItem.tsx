import { FC, memo } from 'react';
import styled from '@emotion/styled';

import theme from '@theme';
import LinkWrap from '../../common/LinkWrap';
import Text, { TextProps } from '../../common/text/Text';

type StyledItemPros = {
  theme: {
    isActive: boolean | undefined;
    isBg: boolean | undefined;
  };
};

const StyledItem = styled('li')<StyledItemPros>(({ theme: { isActive, isBg } }) => ({
  backgroundColor: isBg && isActive ? theme.palette.primary.main : undefined,
  borderRadius: theme.spacing(1.5),

  '&:hover': {
    backgroundColor: isBg ? theme.palette.primary.main : undefined,
  },
}));

const StyledText = styled(Text)({
  display: 'block',
  padding: theme.spacing(1.5, 3),
});

export type MenuItemProps = {
  name: string;
  path: string;
  isActive?: boolean;
  target?: string;
  color?: string;
  isBg?: boolean;
} & Pick<TextProps, 'color' | 'variant'>;

const HeaderMenuItem: FC<MenuItemProps> = ({
  name,
  path,
  isActive,
  target = '',
  color = theme.palette.common.white,
  variant = 'body1',
  isBg = true,
}): JSX.Element => (
  <StyledItem theme={{ isActive, isBg }}>
    <LinkWrap href={path} target={target}>
      <StyledText tid={`HEADER.${name}`} color={color} variant={variant} />
    </LinkWrap>
  </StyledItem>
);

export default memo(HeaderMenuItem);
