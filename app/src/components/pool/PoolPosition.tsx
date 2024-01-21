import React, { FC, memo } from 'react';

import ValuesList from '../common/ValuesList';

type PoolPositionProps = {
  balance: number;
  shares: string;
  symbol: string;
};

const PoolPosition: FC<PoolPositionProps> = ({ balance, shares, symbol }): JSX.Element => {
  const valuesList = [
    {
      id: '01',
      title: 'POOL.MY_POSITION.BALANCE',
      value: 'POOL.MY_POSITION.BALANCE_VALUE',
      vValues: { amount: balance, symbol },
    },
    {
      id: '02',
      title: 'POOL.MY_POSITION.SHARES',
      value: 'POOL.MY_POSITION.SHARES_VALUE',
      vValues: { amount: shares },
    },
  ];

  return <ValuesList title="POOL.MY_POSITION.TITLE" list={valuesList} />;
};

export default memo(PoolPosition);
