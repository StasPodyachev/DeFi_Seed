import { FC, Fragment } from 'react';
import styled from '@emotion/styled';

import theme from '@theme';
import Text from '../../text/Text';
import SafeText from '../../text/SafeText';

const Count = styled(SafeText)({
  position: 'absolute',
  top: theme.spacing(-1),
  right: theme.spacing(-1),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: theme.spacing(2.5),
  height: theme.spacing(2.5),
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.dark,
});

export type TabLabelProps = {
  label: string;
  count: number;
};

const TabLabel: FC<TabLabelProps> = ({ label, count }): JSX.Element => (
  <Fragment>
    <Text tid={label} />
    <Count content={`${count}`} variant="subtitle2" />
  </Fragment>
);

export default TabLabel;
