import { FC } from 'react';
import Image from 'next/image';
import DialogTitle from '@mui/material/DialogTitle';

import { getStaticAssetPath } from '@utils';
import Text from '../text/Text';
import CloseButton from '../buttons/CloseButton';

type DialogTitleComponentProps = {
  title?: string;
  color?: string;
  tValues?: object;
  onClose?: () => void;
};

const DialogTitleComponent: FC<DialogTitleComponentProps> = ({ title, tValues = {}, color, onClose }): JSX.Element => (
  <DialogTitle>
    <Image priority src={getStaticAssetPath('logo.svg')} width={100} height={38.79} alt="logo d4x" />
    {title && (
      <Text component="h2" variant="h6" tid={title} values={tValues} fontWeight={600} align="center" color={color} />
    )}
    {onClose && <CloseButton onClick={onClose} />}
  </DialogTitle>
);

export default DialogTitleComponent;
