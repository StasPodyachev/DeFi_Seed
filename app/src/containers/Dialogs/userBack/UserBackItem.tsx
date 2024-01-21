import React, { ElementType, FC } from 'react';
import styled from '@emotion/styled';
import Flex from '@mui/material/Stack';

import theme from '@theme';
import { Text } from '@components';
import SubTitle from '../faucet/SubTitle';

const Wrap = styled(Flex)({
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  transition: 'background 0.5s ease',

  '&:hover': {
    background: theme.palette.primary.main,
  },
});

type UserBackItemProps = {
  Icon: ElementType;
  title: string;
  subTitle?: string;
  onClick: () => void;
};

const UserBackItem: FC<UserBackItemProps> = ({ Icon, title, subTitle, onClick }): JSX.Element => (
  <Wrap gap={2} alignItems="center" onClick={onClick}>
    <Flex padding={1} borderRadius="50%" border={`1px solid ${theme.palette.grey[400]}`}>
      <Icon fontSize="large" />
    </Flex>
    <Flex flexDirection="column">
      <Text tid={title} fontWeight={600} />
      {subTitle && <SubTitle text={subTitle} />}
    </Flex>
  </Wrap>
);

export default UserBackItem;
