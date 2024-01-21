import React, { FC } from 'react';
import styled from '@emotion/styled';
import Flex from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Close from '@mui/icons-material/Close';

import theme from '@theme';
import { Text } from '@components';

const TitleWrap = styled(Flex)({
  background: theme.palette.error.main,
});

export type HeaderProps = {
  title: string;
  subTitle: string;
  onBack: () => void;
  onClose: () => void;
};

const UserBackHeader: FC<HeaderProps> = ({ title, subTitle, onBack, onClose }): JSX.Element => (
  <Flex gap={2} flexDirection="column" width="100%">
    <TitleWrap alignItems="center" padding={theme.spacing(2, 1)}>
      <ButtonBase onClick={onBack}>
        <ArrowLeftIcon />
      </ButtonBase>
      <Text tid={title} component="h6" variant="h6" flex={1} align="center" />
      <ButtonBase onClick={onClose}>
        <Close />
      </ButtonBase>
    </TitleWrap>
    <Text tid={subTitle} component="p" align="center" />
  </Flex>
);

export default UserBackHeader;
