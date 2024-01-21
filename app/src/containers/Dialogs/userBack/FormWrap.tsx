import React, { FC, ReactNode } from 'react';
import Flex from '@mui/material/Stack';

import { Button, ButtonProps } from '@components';
import Header, { HeaderProps } from './Header';

export type FormWrapProps = {
  OnSendProps: ButtonProps;
  children: ReactNode;
} & HeaderProps;

const FormWrap: FC<FormWrapProps> = ({ OnSendProps, children, ...props }): JSX.Element => (
  <Flex gap={1} flexDirection="column">
    <Header {...props} />
    <Flex gap={2} flexDirection="column" alignItems="center" padding={2}>
      {children}
      <Button width="100px" title="COMMON.SEND" sx={{ alignSelf: 'end' }} {...OnSendProps} />
    </Flex>
  </Flex>
);

export default FormWrap;
