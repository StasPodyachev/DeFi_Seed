import { FC } from 'react';
import styled from '@emotion/styled';

import theme from '@theme';
import Text from '../text/Text';

const Wrap = styled('div')({
  display: 'flex',
  width: 'fit-content',
  padding: theme.spacing(0.25, 1),
  backgroundColor: theme.palette.error.main,
  borderRadius: theme.spacing(2),
});

const LiquidatedLabel: FC = (): JSX.Element => (
  <Wrap>
    <Text tid="POSITION.LIQUIDATED" variant="subtitle2" />
  </Wrap>
);

export default LiquidatedLabel;
