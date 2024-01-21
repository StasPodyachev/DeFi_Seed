import ROUTES from './routes';

export const HEADER_ITEMS = {
  OPEN_POSITION: 'OPEN_POSITION',
  POOL: 'POOL',
  DASHBOARD: 'DASHBOARD',
  DOCS: 'DOCS',
};

export const MAIN_MENU = [
  {
    name: HEADER_ITEMS.OPEN_POSITION,
    path: ROUTES.HOME,
  },
  {
    name: HEADER_ITEMS.POOL,
    path: ROUTES.POOL,
  },
  {
    name: HEADER_ITEMS.DASHBOARD,
    path: ROUTES.DASHBOARD,
  },
  {
    name: HEADER_ITEMS.DOCS,
    path: ROUTES.DOCS,
    target: '_blank',
  },
];
