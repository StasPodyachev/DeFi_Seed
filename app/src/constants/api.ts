import { HttpLink } from '@apollo/client';
import { SEPOLIA_CHAIN_ID } from '.';

export const URLS = {
  SEPOLIA: process.env.NEXT_PUBLIC_THEGRAPH_API_SEPOLIA as string,
  FAUCET: process.env.NEXT_PUBLIC_FAUCET as string,
  ADDRESSES: process.env.NEXT_PUBLIC_ADDRESSES as string,
  ONE_INCH_SWAP: process.env.NEXT_PUBLIC_ONE_INCH_SWAP as string,
  FEEDBACK:
    'https://script.google.com/macros/s/AKfycbwJi_t3oQpgSjjemheWwUpDjv5lCALoaGg6JRhrfi-beEwGiwD_gHr_VpfAGenMY_Qu/exec',
} as const;

// Update if added new chain
export const getApolloUrl = (chainId: number) => {
  let uri = '';

  switch (chainId) {
    case SEPOLIA_CHAIN_ID:
      uri = URLS.SEPOLIA;
      break;
  }

  return new HttpLink({ uri });
};
