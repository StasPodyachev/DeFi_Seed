import React, { Fragment, FC } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import theme from '@theme';
import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { DialogTitle, ValuesList, Button } from '@components';

type PositionConfirmDialogProps = {
  data?: {};
  onClose: () => void;
};

const PositionConfirmDialog: FC<PositionConfirmDialogProps> = ({ onClose }): JSX.Element => {
  const { positionForm } = useTypedSelector((state) => state.form);
  const { updatePositionValues } = useActions();
  const { tokenSell, tokenBuy, leverage, marketRate, marginCall } = positionForm;

  const valuesList = [
    {
      id: '01',
      title: 'POSITION.CONFIRM.PAIR',
      value: 'POSITION.CONFIRM.PAIR_VALUE',
      vValues: { tokenSellSymbol: tokenSell.symbol, tokenBuySymbol: tokenBuy.symbol },
    },
    {
      id: '02',
      title: 'POSITION.CONFIRM.INVESTED_BY_TOKEN',
      tValues: { tokenSymbol: tokenSell.symbol },
      value: 'POSITION.CONFIRM.INVESTED_BY_TOKEN_VALUE',
      vValues: { tokenAmount: tokenSell.amount, tokenSymbol: tokenSell.symbol },
    },
    {
      id: '03',
      title: 'POSITION.CONFIRM.INVESTED_BY_ALP',
      value: 'POSITION.CONFIRM.INVESTED_BY_ALP_VALUE',
      vValues: { amount: leverage * tokenSell.amount - tokenSell.amount, tokenSymbol: tokenSell.symbol },
    },
    {
      id: '04',
      title: 'POSITION.CONFIRM.LEVERAGE',
      value: 'POSITION.CONFIRM.LEVERAGE_VALUE',
      vValues: { leverage },
    },
    {
      id: '05',
      title: 'POSITION.CONFIRM.MARKET_RATE',
      value: 'POSITION.CONFIRM.MARKET_RATE_VALUE',
      vValues: { marketRate, tokenSellSymbol: tokenSell.symbol, tokenBuySymbol: tokenBuy.symbol },
    },
    {
      id: '06',
      title: 'POSITION.CONFIRM.POSITION_AMOUNT',
      value: 'POSITION.CONFIRM.POSITION_AMOUNT_VALUE',
      vValues: { tokenAmount: tokenBuy.amount, tokenSymbol: tokenBuy.symbol },
    },
    {
      id: '07',
      title: 'POSITION.CONFIRM.MARGIN_CALL',
      value: 'POSITION.CONFIRM.MARGIN_CALL_VALUE',
      vValues: { marginCall, tokenSellSymbol: tokenSell.symbol, tokenBuySymbol: tokenBuy.symbol },
      ValueProps: { styledTextColor: theme.palette.error.main },
      opacity: 0.6,
    },
  ];

  const handleClick = () => {
    updatePositionValues({ field: 'isConfirmed', value: true });
    onClose();
  };

  return (
    <Fragment>
      <DialogTitle title="POSITION.CONFIRM.TITLE" onClose={onClose} />
      <DialogContent>
        <ValuesList list={valuesList} />
      </DialogContent>
      <DialogActions>
        <Button title="COMMON.CONFIRM" width="200px" onClick={handleClick} />
      </DialogActions>
    </Fragment>
  );
};

export default PositionConfirmDialog;
