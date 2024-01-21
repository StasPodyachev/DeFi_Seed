import { FC, useEffect, Fragment } from 'react';
import { useContractRead } from 'wagmi';

import useTypedSelector from '@hooks/useTypedSelector';
import useActions from '@hooks/useActions';
import useOneInchRate from '@hooks/useOneInchRate';
import { convertBigIntToNumber } from '@utils';
import { performPositionRatesResult } from '@utils/api/positions';
import { prepareMarketRateContractConfig, performMarketRateValue, performMarginCallValue } from '@utils/position';
import { MarketRate, MarginCall } from '@components';

const PositionRatesContainer: FC = (): JSX.Element => {
  const { chainId } = useTypedSelector((state) => state.user);
  const { positionForm } = useTypedSelector((state) => state.form);
  const addresses = useTypedSelector((state) => state.addresses.list[chainId]);
  const { updatePositionValues } = useActions();
  const { tokenBuy, tokenSell, marketRate, marginCall, leverage } = positionForm;
  const contractConfig = prepareMarketRateContractConfig(positionForm, addresses);
  const { data, isLoading } = useContractRead({ chainId, ...contractConfig });
  const { data: oneInchData, isLoading: isLoadingOneInch } = useOneInchRate();

  useEffect(() => {
    updatePositionValues({ field: 'isLoading', value: isLoadingOneInch });

    if (isLoading || isLoadingOneInch) return;

    let tokenBuyAmount = 0;
    let marketRateValue = 0;
    let marginCallValue = 0;
    let path: string = '0x';

    if (data) {
      const { value, pathValue } = performPositionRatesResult(data, positionForm);
      tokenBuyAmount = convertBigIntToNumber(value, tokenBuy.decimals);

      if (pathValue) path = pathValue;
      if (value) updatePositionValues({ field: 'tokenBuyAmountRaw', value: value.toString() });
    }

    if (oneInchData) {
      tokenBuyAmount = convertBigIntToNumber(oneInchData.toAmount, tokenBuy.decimals);
      path = oneInchData.tx.data;
      updatePositionValues({ field: 'tokenBuyAmountRaw', value: oneInchData.toAmount });
    }

    marketRateValue = performMarketRateValue(tokenSell.amount, tokenBuyAmount, leverage);
    marginCallValue = performMarginCallValue(leverage, marketRateValue);
    updatePositionValues({ field: 'path', value: path });
    updatePositionValues({ field: 'tokenBuyAmount', value: +tokenBuyAmount.toFixed(tokenBuy.numbersAfterComma) });
    updatePositionValues({ field: 'marketRate', value: +marketRateValue.toFixed(6) });
    updatePositionValues({ field: 'marginCall', value: +marginCallValue.toFixed(6) });
  }, [isLoading, data, isLoadingOneInch, oneInchData]);

  return (
    <Fragment>
      <MarketRate
        icon={tokenSell.iconUrl}
        value={marketRate}
        tokenSellSymbol={tokenSell.symbol}
        tokenBuySymbol={tokenBuy.symbol}
        isLoading={isLoadingOneInch}
      />
      <MarginCall
        value={marginCall}
        tokenSellSymbol={tokenSell.symbol}
        tokenBuySymbol={tokenBuy.symbol}
        isLoading={isLoadingOneInch}
      />
    </Fragment>
  );
};

export default PositionRatesContainer;
