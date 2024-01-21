import { FC, ReactNode, useMemo } from 'react';

import theme from '@theme';
import { Position } from '@models/positions';
import { EXCHANGERS } from '@constants/dictionaries';
import ValuesList from '../../../common/ValuesList';
import PositionValue, { PositionValueProps } from './PositionValue';

export type PositionInformationProps = {
  renderCurrentRate?: ((position: Position) => ReactNode) | undefined;
  renderCurrentTokenSell?: ((position: Position) => ReactNode) | undefined;
} & Position;

const PositionInformation: FC<PositionInformationProps> = (props): JSX.Element => {
  const {
    id,
    date,
    leverage,
    tokenSellSymbol,
    tokenSellAmount,
    tokenBuySymbol,
    tokenBuyAmount,
    entryRate,
    liquidationRate,
    renderCurrentRate,
    renderCurrentTokenSell,
    exchangeValue,
  } = props;
  const exchanger = useMemo(() => EXCHANGERS.find((i) => i.value === exchangeValue)?.name, [exchangeValue]);

  const valuesList: Array<Partial<PositionValueProps> & { id: string }> = [
    {
      id: '01',
      title: 'DASHBOARD.POSITIONS.ID',
      value: `#${id}`,
    },
    {
      id: '02',
      title: 'DASHBOARD.POSITIONS.DATE',
      value: date,
    },
    {
      id: '03',
      title: 'DASHBOARD.POSITIONS.ENTRY_RATE',
      value: entryRate,
    },
    {
      id: '05',
      title: 'DASHBOARD.POSITIONS.LIQUIDATION_RATE',
      value: liquidationRate,
      ValueProps: { color: theme.palette.grey[400] },
    },
    {
      id: '06',
      title: 'DASHBOARD.POSITIONS.EXCHANGER',
      value: exchanger,
    },
    {
      id: '07',
      title: 'DASHBOARD.POSITIONS.INVESTED_BY_TRADER',
      value: `${tokenSellAmount} ${tokenSellSymbol}`,
    },
    {
      id: '08',
      title: 'DASHBOARD.POSITIONS.INVESTED_BY_ALP',
      value: `${tokenSellAmount * leverage - tokenSellAmount} ${tokenSellSymbol}`,
    },
    {
      id: '09',
      title: 'DASHBOARD.POSITIONS.INVESTED_TOTAL',
      value: `${tokenSellAmount * leverage} ${tokenSellSymbol}`,
    },
    {
      id: '10',
      title: 'DASHBOARD.POSITIONS.TOKEN_BUY',
      tValues: { tokenSymbol: tokenBuySymbol },
      value: `${tokenBuyAmount} ${tokenBuySymbol}`,
    },
  ];

  if (renderCurrentRate) {
    valuesList.splice(3, 0, {
      id: '04',
      title: 'DASHBOARD.POSITIONS.CURRENT_RATE',
      value: renderCurrentRate(props),
    });
  }

  if (renderCurrentTokenSell) {
    valuesList.push({
      id: '11',
      title: 'DASHBOARD.POSITIONS.CURRENT_TOKEN_SELL',
      tValues: { tokenSymbol: tokenSellSymbol },
      value: renderCurrentTokenSell(props),
    });
  }

  return <ValuesList list={valuesList} ItemComponent={PositionValue} background={theme.palette.primary.dark} />;
};

export default PositionInformation;
