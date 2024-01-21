import React, { FC } from 'react';
import { keyframes } from '@emotion/react';
import Flex from '@mui/material/Stack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import theme from '@theme';
import { Text } from '@components';

const ICON_WIDTH = 48;
const ICON_HEIGHT = 48;

const show = keyframes`
  0% {
    width: 0;
    height: 0;
  }
  70% {
    width: 60px;
    height: 60px;
  }
  100% {
    width: ${ICON_WIDTH}px;
    height: ${ICON_HEIGHT}px;
  }
`;

const SuccessSent: FC = (): JSX.Element => (
  <Flex gap={1} flexDirection="column" alignItems="center">
    <Flex justifyContent="center" alignItems="center" width={ICON_WIDTH} height={ICON_HEIGHT}>
      <CheckCircleOutlineIcon
        fontSize="large"
        htmlColor={theme.palette.success.main}
        sx={{
          width: ICON_WIDTH,
          height: ICON_HEIGHT,
          animation: `${show} 1s ease`,
        }}
      />
    </Flex>
    <Flex flexDirection="column" alignItems="center">
      <Text tid="USER_BACK.SUCCESS.TITLE" component="h6" variant="h6" align="center" fontWeight={600} />
      <Text tid="USER_BACK.SUCCESS.SUB_TITLE" align="center" />
    </Flex>
  </Flex>
);

export default SuccessSent;
