import { AddressType } from '@models';

export const MAIN_CONTENT_ID = 'main-content';

export const MAINNET_CHAI_ID = 1;
export const OPTIMISM_CHAI_ID = 10;
export const POLYGON_CHAI_ID = 137;
export const OPTIMISM_GOERLI_CHAI_ID = 420;
export const POLYGON_MUMBAI_CHAI_ID = 80001;
export const SEPOLIA_CHAIN_ID = 11155111;

export const TESTNET_CHAIN_IDS: Array<number> = [OPTIMISM_GOERLI_CHAI_ID, POLYGON_MUMBAI_CHAI_ID];

export const BIG_1E6 = 1000000;
export const BIG_1E8 = 100000000;
export const BIG_1E9 = 1000000000;
export const BIG_1E10 = 10000000000;
export const BIG_1E16 = 10000000000000000;
export const BIG_1E18 = 1000000000000000000;
export const BIG_1E20 = 100000000000000000000;

export const LIQUIDATION_DELTA_PERCENT = 0.1;
export const SLIPPAGE = 2;

export const EMPTY_ADDRESS = '' as AddressType;

// and convert to lowerCase
export const OPTIMISM_GOERLI_TOKEN_SYMBOLS: { [keys: AddressType]: string } = {
  '0xcd4e0d6d2b1252e2a709b8ae97dba31164c5a709': 'ADAI',
  '0x69529987fa4a075d0c00b0128fa848dc9ebbe9ce': 'AUSDC',
};

export const POLYGON_MUMBAI_TOKEN_SYMBOLS: { [keys: AddressType]: string } = {
  '0xc8c0cf9436f4862a8f60ce680ca5a9f0f99b5ded': 'ADAI',
  '0x52d800ca262522580cebad275395ca6e7598c014': 'AUSDC',
};

export const MAINNET_TOKENS: { [key: string]: string } = {
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  EUROC: '0x32272E3239f651A700C91F7348193665a6309f07',
  TON: '0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  GHO: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
};

// Update if added new chain (add new chain config for mobile and add it into component WrongNetworkDialog)
export const OPTIMISM_CHAIN = {
  chainId: '0xa',
  chainName: 'OP Mainnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://optimism.llamarpc.com'],
  blockExplorerUrls: ['https://optimistic.etherscan.io'],
};

export const SEPOLIA = {
  chainId: '0xaa36a7',
  chainName: 'Sepolia',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.infura.io/v3/'],
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
};

export const POLYGON_CHAIN = {
  chainId: '0x89',
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://polygon-rpc.com'],
  blockExplorerUrls: ['https://polygonscan.com'],
};

export const OPTIMISM_GOERLI_CHAIN = {
  chainId: '0x1a4',
  chainName: 'Optimism Goerli Testnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://goerli.optimism.io'],
  blockExplorerUrls: ['https://goerli-optimism.etherscan.io'],
};

export const POLYGON_MUMBAI_CHAIN = {
  chainId: '0x13881',
  chainName: 'Polygon Mumbai Testnet',
  nativeCurrency: {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com'],
};

export const META_ID = {
  OPEN_POSITION: 'OPEN_POSITION',
  POOL: 'POOL',
  DASHBOARD: 'DASHBOARD',
};

export const DIALOGS = {
  WAITING_CONFIRMATION: 'WaitingConfirmationDialog',
  TRANSACTION_SUBMITTED: 'TransactionSubmittedDialog',
  TRANSACTION_ERROR: 'TransactionErrorDialog',
  POSITION_CONFIRM: 'PositionConfirmDialog',
  POSITION_SUCCESS: 'PositionSuccessDialog',
  POSITION_LEVERAGE_ERROR: 'PositionLeverageErrorDialog',
  POOL_CONFIRM: 'PoolConfirmDialog',
  POOL_SUCCESS: 'PoolSuccessDialog',
  FAUCET_TOKENS: 'FaucetTokensDialog',
  FAUCET_SUCCESS: 'FaucetSuccessDialog',
  FAUCET_ERROR: 'FaucetErrorDialog',
  METAMASK_NOT_FOUND: 'MetamaskNotFoundDialog',
  WRONG_NETWORK: 'WrongNetworkDialog',
  USER_BACK: 'UserBackDialog',
  LIMIT_ERROR: 'LimitErrorDialog',
};

export const POSITIONS_STATUS = {
  OPENED: 0,
  CLOSED: 1,
  LIQUIDATED: 2,
};

export const NUMBERS_AFTER_COMMA: { [keys: string]: number } = {
  DAI: 2,
  ADAI: 2,
  AUSDC: 2,
  USDT: 2,
  USDC: 2,
  WETH: 6,
  TON: 2,
};

export const WAIT_TRANSACTION = {
  OPEN_POSITION: 'OPEN_POSITION',
  DEPOSIT_POOL: 'DEPOSIT_POOL',
  WITHDRAW_POOL: 'WITHDRAW_POOL',
};

export const ELEMENT_IDS = {
  DASHBOARD_POOLS: 'dashboard_pools',
};

export const FAUCET_ERROR = {
  RECEIVED: 'RECEIVED',
  NO_NATIVE_TOKENS: 'NO_NATIVE_TOKENS',
  ZERO_ADDRESS: 'ZERO_ADDRESS',
  NO_FAUCET_TOKENS: 'NO_FAUCET_TOKENS',
  ERROR: 'ERROR',
};

export const SESSION_STORE_KEY = {
  IS_HIDDEN_FAUCET_TOKENS_DIALOG: 'is_hidden_faucet_tokens_dialog',
};

export const LIMIT_ERROR = {
  LIMIT: 'LIMIT',
  MAX_DEPOSIT: 'limitMaxDeposit',
  MAX_FREE_ALP_PERCENT: 'limitMaxFreeAlpPercent',
  MAX_LEVERAGE_AMOUNT: 'limitMaxLeverageAmount',
  MAX_TOTAL_ALP_PERCENT: 'limitMaxTotalAlpPercent',
};
