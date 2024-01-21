import React, { Fragment, FC } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Flex from '@mui/material/Stack';

import useTypedSelector from '@hooks/useTypedSelector';
import { AddressType } from '@models';
import { DialogTitle, ExplorerLink, ValuesList, Button } from '@components';

type PositionSuccessDialogProps = {
  data: {
    txAddress?: AddressType;
  };
  onClose: () => void;
};

const PositionSuccessDialog: FC<PositionSuccessDialogProps> = ({ data, onClose }): JSX.Element => {
  const { chainId } = useTypedSelector((state) => state.user);
  const { openPositionData } = useTypedSelector((state) => state.transactions);
  const { tokenSell, tokenBuy, leverage, marketRate } = openPositionData;
  const { txAddress } = data;

  const valuesList = [
    {
      id: '01',
      title: 'POSITION.SUCCESS.TOKEN_BUY',
      tValues: { tokenSymbol: tokenBuy.symbol },
      value: 'POSITION.SUCCESS.TOKEN_BUY_VALUE',
      vValues: { tokenAmount: tokenBuy.amount, tokenSymbol: tokenBuy.symbol },
    },
    {
      id: '02',
      title: 'POSITION.SUCCESS.ENTRY_RATE',
      value: 'POSITION.SUCCESS.ENTRY_RATE_VALUE',
      vValues: { entryRate: marketRate, tokenSellSymbol: tokenSell.symbol, tokenBuySymbol: tokenBuy.symbol },
    },
    {
      id: '03',
      title: 'POSITION.SUCCESS.INVESTED_BY_TOKEN',
      tValues: { tokenSymbol: tokenSell.symbol },
      value: 'POSITION.SUCCESS.INVESTED_BY_TOKEN_VALUE',
      vValues: { tokenAmount: leverage * tokenSell.amount, tokenSymbol: tokenSell.symbol },
    },
    {
      id: '04',
      title: 'POSITION.SUCCESS.INVESTED_BY_ALP',
      value: 'POSITION.SUCCESS.INVESTED_BY_ALP_VALUE',
      vValues: { amount: leverage * tokenSell.amount - tokenSell.amount, tokenSymbol: tokenSell.symbol },
    },
  ];

  return (
    <Fragment>
      <DialogTitle title="POSITION.SUCCESS.TITLE" onClose={onClose} />
      <DialogContent>
        <Flex gap={2} flexDirection="column" alignItems="center" width="100%">
          {txAddress && chainId && <ExplorerLink address={txAddress} chainId={chainId} />}
          <ValuesList title="POSITION.SUCCESS.SUB_TITLE" list={valuesList} />
        </Flex>
      </DialogContent>
      <DialogActions>
        <Button title="COMMON.OK" width="200px" onClick={onClose} />
      </DialogActions>
    </Fragment>
  );
};

export default PositionSuccessDialog;
