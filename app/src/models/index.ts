import { MAIN_MENU } from '@constants/navigation';

export type AddressType = `0x${string}`;

export type Addresses = {
  Factory: AddressType;
  D4X: AddressType;
  CurveExchange: AddressType;
  UniswapExchange: AddressType;
  OneInchExchange: AddressType;
};

export type ChainParams = {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: Array<string>;
  blockExplorerUrls: Array<string>;
};

export type MainMenu = typeof MAIN_MENU;
