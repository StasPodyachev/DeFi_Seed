import React, { FC } from 'react';
import Flex from '@mui/material/Stack';

import SafeText from './text/SafeText';

const NotFound: FC = (): JSX.Element => (
  <Flex justifyContent="center" alignItems="center" margin={4}>
    <SafeText content="404" variant="h2" component="p" fontWeight={600} />
  </Flex>
);

export default NotFound;
