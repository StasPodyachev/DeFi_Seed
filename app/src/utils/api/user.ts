import { chains } from '@services/wagmi';
import { TESTNET_CHAIN_IDS } from '@constants';

export const isWrongNetwork = (chainId: number) => !chains.find(({ id }) => id === chainId);

export const isTestNet = (chainId: number) => TESTNET_CHAIN_IDS.includes(chainId);
