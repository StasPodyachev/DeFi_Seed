import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import Flex from '@mui/material/Stack';

import theme from '@theme';

type StyledListProps = {
  theme: {
    background: string | undefined;
  };
};

const StyledList = styled(Flex)<StyledListProps>(({ theme: { background } }) => ({
  padding: theme.spacing(2),
  backgroundColor: background || theme.palette.primary.main,
  borderRadius: theme.spacing(1),
}));

export type ListWrapProps = {
  children: ReactNode;
  background?: string;
};

const ListWrap: FC<ListWrapProps> = ({ background, children }): JSX.Element => (
  <StyledList gap={1} flexDirection="column" theme={{ background }}>
    {children}
  </StyledList>
);

export default ListWrap;
