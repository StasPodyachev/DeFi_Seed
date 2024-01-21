import { AddressType } from '.';

export type Pool = {
  id: string;
  name: string;
  iconUrl: string;
  symbol: string;
  address: AddressType;
  amount?: string;
};

export type Pools = Array<Pool>;
