import { FC } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';

import theme from '@theme';
import { getStaticAssetPath } from '@utils';
import Text from '../text/Text';

const transform = keyframes`
  0% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.05);
    box-shadow: 0px 0px 20px 3px rgba(44, 209, 220, 0.5);
    background: rgba(44, 209, 220, 0.25);
  }
  30% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.05);
  }
  60% {
    transform: scale(1);
  }
  70% {
    transform: rotate(-5deg);
  }
  85% {
    transform: rotate(5deg);
  }
`;

const StyledButton = styled(ButtonBase)({
  position: 'fixed',
  bottom: theme.spacing(4),
  left: theme.spacing(4),

  [theme.breakpoints.down('md')]: {
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
});

const StyledIcon = styled(Image)({
  animation: `${transform} 4s ease infinite`,
  borderRadius: '50%',
});

const UserBackButton: FC<ButtonBaseProps> = (props): JSX.Element => (
  <Tooltip title={<Text tid="USER_BACK.GIVE_FEEDBACK" />}>
    <StyledButton {...props}>
      <StyledIcon src={getStaticAssetPath('x.svg')} width={48} height={48} alt="" />
    </StyledButton>
  </Tooltip>
);

export default UserBackButton;
