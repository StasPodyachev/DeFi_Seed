import { connectorsForWallets, darkTheme } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  walletConnectWallet,
  metaMaskWallet,
  rainbowWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { isMobile } from 'react-device-detect';
import { configureChains, createConfig } from 'wagmi';
import { sepolia, Chain } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import theme from '@theme';

const sepoliaChain: Chain = {
  ...sepolia,
};

// the order of the networks is important, see constants/index.ts file
// if added new chain need add chainId into function with commit => Update if added new chain
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepoliaChain],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_REACT_APP_ALCHEMY_KEY as string,
    }),
    publicProvider(),
  ],
);

const projectId = '5384a11f739228120ab5aac24bde0462';

const defaultConnectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
      coinbaseWallet({ appName: 'D4X.com', chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      argentWallet({ projectId, chains }),
    ],
  },
]);

const mobConnectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [walletConnectWallet({ projectId, chains })],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: isMobile ? mobConnectors : defaultConnectors,
  publicClient,
  webSocketPublicClient,
});

const rainbowKitConfig = {
  showRecentTransactions: true,
  modalSize: 'wide',
  theme: darkTheme({
    accentColor: theme.palette.secondary.main,
    accentColorForeground: theme.palette.common.white,
    borderRadius: 'medium',
    fontStack: 'rounded',
    overlayBlur: 'none',
  }),
} as const;

export { wagmiConfig, rainbowKitConfig, chains };
