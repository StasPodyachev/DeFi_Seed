import { FC, useEffect } from 'react';
import Flex from '@mui/material/Stack';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import { withError } from '@hocs';
import usePositionTokensValues from '@hooks/usePositionTokensValues';
import { PositionField, PositionFieldValue } from '@models/form';
import { HEADER_ITEMS } from '@constants/navigation';
import {
  PositionTokensValuesWrap,
  ControlsWrap,
  Select,
  Input,
  OpenPositionLoader,
  PositionActions,
  ConnectButton,
} from '@components';
import ExchangesControl from '../controls/Exchanges';
import LeverageControl from '../controls/Leverage';
import PositionRatesContainer from './PositionRates';
import OpenPositionButtonContainer from './OpenPositionButton';
import ApproveTokenButtonContainer from './ApproveTokenButton';

const OpenPositionContainer: FC = (): JSX.Element => {
  const { chainId, isUserConnected, isWrongNetwork } = useTypedSelector((state) => state.user);
  const { positionForm } = useTypedSelector((state) => state.form);
  const {
    loading: isLoadingTokens,
    hasData: hasTokens,
    chainId: tokensChainId,
  } = useTypedSelector((state) => state.tokens);
  const { changeHeaderItem, updatePositionValues, getTokens } = useActions();
  const positionTokensValues = usePositionTokensValues();

  useEffect(() => {
    changeHeaderItem(HEADER_ITEMS.OPEN_POSITION);
  }, []);

  useEffect(() => {
    getTokens(chainId);
  }, [chainId]);

  if (!hasTokens || isLoadingTokens || chainId !== tokensChainId) {
    return <OpenPositionLoader />;
  }

  const { exchange, leverage, tokenBuy, tokenSell, approvedAmount, isLoading } = positionForm;
  const availableTokens = positionTokensValues.find((item) => item.value === tokenSell.value)?.availableTokens || [];

  const handleChange = (field: PositionField) => (value?: PositionFieldValue) => {
    updatePositionValues({ field, value });
  };

  return (
    <Flex gap={2} flexDirection="column">
      <ExchangesControl value={exchange} onChange={handleChange('exchange')} />
      <LeverageControl
        label="POSITION.OPEN.LEVERAGE"
        LabelProps={{ tooltip: 'POSITION.OPEN.LEVERAGE_TOOLTIP' }}
        value={`${leverage}`}
        onChange={handleChange('leverage')}
      />
      <PositionTokensValuesWrap onToggleClick={handleChange('toggleTokens')}>
        <ControlsWrap
          renderSelect={
            <Select
              items={positionTokensValues}
              value={tokenSell}
              onChange={handleChange('tokenSell')}
              disabled={!!isLoading}
            />
          }
          renderInput={
            <Input
              type="number"
              value={`${tokenSell.amountStr}`}
              onChange={handleChange('tokenSellAmount')}
              disabled={!!isLoading}
            />
          }
          tooltip="POSITION.OPEN.TOKEN_SELL_TOOLTIP"
        />
        <ControlsWrap
          renderSelect={
            <Select
              items={availableTokens}
              value={tokenBuy}
              onChange={handleChange('tokenBuy')}
              disabled={!!isLoading}
            />
          }
          renderInput={<Input type="number" value={`${tokenBuy.amount}`} disabled />}
          tooltip="POSITION.OPEN.TOKEN_BUY_TOOLTIP"
        />
      </PositionTokensValuesWrap>
      <PositionRatesContainer />

      {!isUserConnected || isWrongNetwork ? (
        <ConnectButton fullWidth />
      ) : (
        <PositionActions ApprovedTokensProps={{ value: approvedAmount, symbol: tokenSell.symbol }}>
          <OpenPositionButtonContainer />
          <ApproveTokenButtonContainer />
        </PositionActions>
      )}
    </Flex>
  );
};

export default withError(OpenPositionContainer);
