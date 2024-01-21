import { FC } from 'react';
import Image from 'next/image';

import { getStaticAssetPath } from '@utils';
import Button, { ButtonProps } from './Button';

const MetamaskButton: FC<ButtonProps> = (props): JSX.Element => (
  <Button
    {...props}
    title="COMMON.ADD_TO"
    endIcon={<Image src={getStaticAssetPath('metamask.svg')} width={24} height={24} alt="add to metamask" />}
  />
);

export default MetamaskButton;
