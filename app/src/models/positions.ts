import { AddressType } from '.';

export type Position = {
  id: string;
  name: string;
  date: string;
  leverage: number;
  tokenSellSymbol: string;
  tokenSellAmount: number;
  tokenSellIcon: string;
  tokenSellAddress: AddressType;
  tokenSellDecimals: number;
  tokenBuySymbol: string;
  tokenBuyAmount: number;
  tokenBuyIcon: string;
  tokenBuyAddress: AddressType;
  tokenBuyDecimals: number;
  entryRate: string;
  status: number;
  openedTxAddress: AddressType | null;
  closedTxAddress: AddressType | null;
  liquidatedTxAddress: AddressType | null;
  exchangeValue: string;
  liquidationRate: string;
};

export type Positions = Array<Position>;
