import { PoolsApi } from '@models/api';
import { Pools } from '@models/pools';
import { getStaticAssetPath } from '@utils';

export const performPools = (raw: PoolsApi): Pools =>
  raw.map((item) => ({
    id: item.id,
    name: item.name.slice(2),
    address: item.id,
    iconUrl: getStaticAssetPath(`${item.name.slice(2)}.svg`, 'images/tokens'),
    symbol: item.name,
  }));
