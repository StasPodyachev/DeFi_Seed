import { FC } from 'react';

import Button, { ButtonProps } from './Button';

const FaucetButton: FC<ButtonProps> = (props): JSX.Element => (
  <Button {...props} title="COMMON.FAUCET" size="small" width="90px" />
);

export default FaucetButton;
