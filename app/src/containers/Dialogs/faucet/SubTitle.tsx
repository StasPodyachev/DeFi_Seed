import React, { FC } from 'react';

import theme from '@theme';
import { Text } from '@components';

type SubTitleProps = {
  text: string;
};

const SubTitle: FC<SubTitleProps> = ({ text }): JSX.Element => (
  <Text tid={text} component="p" variant="body1" color={theme.palette.grey[400]} align="center" />
);

export default SubTitle;
