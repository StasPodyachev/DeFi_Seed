import BigDecimal from 'decimal.js-light';
import { AddressType } from '@models';
import {
  BIG_1E18,
  BIG_1E6,
  BIG_1E9,
  BIG_1E10,
  OPTIMISM_GOERLI_CHAI_ID,
  POLYGON_MUMBAI_CHAI_ID,
  POLYGON_CHAI_ID,
  OPTIMISM_CHAI_ID,
  SEPOLIA_CHAIN_ID
} from '@constants';

// Update if added new chain
export const getExplorer = (chainId: number) => {
  switch (chainId) {
    case OPTIMISM_CHAI_ID:
      return {
        name: 'TRANSACTION.OPTIMISM',
        link: (address: AddressType, type: 'tx' | 'address') => `https://optimistic.etherscan.io/${type}/${address}`,
      };
    case POLYGON_CHAI_ID:
      return {
        name: 'TRANSACTION.POLYSCAN',
        link: (address: AddressType, type: 'tx' | 'address') => `https://polygonscan.com/${type}/${address}`,
      };
    case OPTIMISM_GOERLI_CHAI_ID:
      return {
        name: 'TRANSACTION.OPTIMIST_GOERLI_ETHERSCAN',
        link: (address: AddressType, type: 'tx' | 'address') =>
          `https://goerli-optimism.etherscan.io/${type}/${address}`,
      };
    case POLYGON_MUMBAI_CHAI_ID:
      return {
        name: 'TRANSACTION.MUMBAI_POLYSCAN',
        link: (address: AddressType, type: 'tx' | 'address') => `https://mumbai.polygonscan.com/${type}/${address}`,
      };
      case SEPOLIA_CHAIN_ID:
        return {
          name: 'TRANSACTION.SEPOLIA_ETHERSCAN',
          link: (address: AddressType, type: 'tx' | 'address') => `https://sepolia.etherscan.io/${type}/${address}`,
        };
    default:
      return {};
  }
};

export const getStaticAssetPath = (name: string, folder: string = 'images') => `/static/${folder}/${name}`;

export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const getTotalNumsAfterPoint = (num: number) => num?.toString().split('.')[1]?.length ?? 0;

export const roundNumber = (num: number, exponent: number) => {
  if (getTotalNumsAfterPoint(num) <= exponent) {
    return num;
  }
  const exponentRes = Math.pow(10, exponent);

  return Math.round(num * exponentRes) / exponentRes;
};

export const getValueByDecimal = (decimals: number) => {
  switch (decimals) {
    case 6:
      return BIG_1E6;
    case 9:
      return BIG_1E9;
    default:
      return BIG_1E18;
  }
};

export const convertBigIntToNumber = (value: bigint | unknown, decimals: number = 1) => {
  if (!value) {
    return 0;
  }
  const val = typeof value === 'bigint' ? value?.toString() : value;

  return +val / getValueByDecimal(decimals);
};

export const convertBigIntToNumberPercent = (value: bigint | unknown) => {
  if (!value) {
    return 0;
  }

  return (+value?.toString() * 100) / BIG_1E10;
};

export const convertNumberToBigInt = (value: number = 0, decimals: number) =>
  BigInt(new BigDecimal(value || 0).mul(getValueByDecimal(decimals) + '').toFixed(0)) + '';

export const convertNumberToBigIntPercent = (value: number = 0) =>
  BigInt(
    new BigDecimal(value || 0)
      .div(100)
      .mul(BIG_1E10 + '')
      .toFixed(0),
  );

export const convertFormattedValue = (value: string | undefined) => (value ? +value : 0);

export const roundFormattedValue = (value: string | undefined, exponent: number = 3) =>
  value ? (+value).toFixed(exponent) : (0).toFixed(exponent);

export const prepareShortStr = (str: string) => {
  if (str.length < 10) return str;

  const start = str.slice(0, 6);
  const end = str.slice(str.length - 4);

  return `${start}...${end}`;
};

export const convertToHex = (value: string) => {
  const bigIntNumber = BigInt(value);

  return bigIntNumber.toString(16).toUpperCase();
};
