import { getStaticAssetPath } from '@utils';
import ROUTES from './routes';

export const EXCHANGERS = [
  {
    value: '0',
    name: 'Uniswap',
    iconUrl: getStaticAssetPath('uniswap.svg'),
  },
  {
    value: '1',
    name: 'Curve',
    iconUrl: getStaticAssetPath('curve.svg'),
  },
  {
    value: '2',
    name: '1inch',
    iconUrl: getStaticAssetPath('oneInch.svg'),
  },
];

export const LEVERAGE = [
  { value: '2', name: 'x2' },
  { value: '5', name: 'x5' },
  { value: '10', name: 'x10' },
  { value: '20', name: 'x20' },
  { value: '50', name: 'x50' },
  { value: '100', name: 'x100' },
];

export const SOCIAL_LINKS = [
  {
    iconUrl: getStaticAssetPath('github.svg', 'images/socials'),
    alt: 'Github',
    href: ROUTES.HOME,
  },
  {
    iconUrl: getStaticAssetPath('discord.svg', 'images/socials'),
    alt: 'Discord',
    href: ROUTES.DISCORD,
  },
  {
    iconUrl: getStaticAssetPath('twitter.svg', 'images/socials'),
    alt: 'Twitter',
    href: ROUTES.TWITTER,
  },
];
