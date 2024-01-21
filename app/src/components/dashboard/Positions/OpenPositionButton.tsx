import { FC, MouseEvent } from 'react';
import Flex from '@mui/material/Stack';

import { redirect } from '@utils/navigation';
import ROUTES from '@constants/routes';
import Button from '../../common/buttons/Button';

const OpenPositionButton: FC = (): JSX.Element => {
  const onOpenPositionClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    redirect(ROUTES.HOME);
  };

  return (
    <Flex justifyContent="flex-end" marginTop={2}>
      <Button
        title="COMMON.OPEN_NEW_POSITION"
        component="a"
        href={ROUTES.HOME}
        fullWidth
        onClick={onOpenPositionClick}
      />
    </Flex>
  );
};

export default OpenPositionButton;
