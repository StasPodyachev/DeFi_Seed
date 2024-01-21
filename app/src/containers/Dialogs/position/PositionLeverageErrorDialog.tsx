import React, { Fragment, FC, MouseEvent } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Flex from '@mui/material/Stack';

import theme from '@theme';
import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { redirect } from '@utils/navigation';
import ROUTES from '@constants/routes';
import { DialogTitle, Button, Text } from '@components';

type PositionLeverageErrorDialogProps = {
  onClose: () => void;
};

const PositionLeverageErrorDialog: FC<PositionLeverageErrorDialogProps> = ({ onClose }): JSX.Element => {
  const { tokenSell } = useTypedSelector((state) => state.form.positionForm);
  const { list } = useTypedSelector((state) => state.tokens);
  const { updatePoolValues } = useActions();

  const updatePoolTokenValues = () => {
    const { value, name, iconUrl, address, symbol, decimals } = tokenSell;
    const selectedToken = list.find((token) => token.symbol === symbol);

    if (!selectedToken) {
      return;
    }

    const tokenValues = {
      value,
      name,
      iconUrl,
      alpAddress: selectedToken.alpAddress,
      alpSymbol: selectedToken.alpSymbol,
      address,
      symbol,
      decimals,
    };

    updatePoolValues({ field: 'token', value: tokenValues });
  };

  const onDepositClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    updatePoolTokenValues();
    onClose();
    redirect(ROUTES.POOL);
  };

  return (
    <Fragment>
      <DialogTitle title="POSITION.LEVERAGE_ERROR.TITLE" onClose={onClose} />
      <DialogContent>
        <Text tid="POSITION.LEVERAGE_ERROR.SUB_TITLE" component="p" color={theme.palette.grey[400]} align="center" />
      </DialogContent>
      <DialogActions>
        <Flex gap={2} flexDirection="column" alignItems="center" maxWidth={200} width="100%">
          <Button title="COMMON.DEPOSIT" width="200px" onClick={onDepositClick} />
          <Button title="COMMON.OK" width="200px" onClick={onClose} />
        </Flex>
      </DialogActions>
    </Fragment>
  );
};

export default PositionLeverageErrorDialog;
