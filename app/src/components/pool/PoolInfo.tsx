import React, { FC, memo } from 'react';

import ValuesList from '../common/ValuesList';

type PoolInfoProps = {
  totalAmount: number;
  availableAmount: number;
  borrowedAmount: number;
  symbol: string;
};

const PoolInfo: FC<PoolInfoProps> = ({ totalAmount, availableAmount, borrowedAmount, symbol }): JSX.Element => {
  const valuesList = [
    {
      id: '01',
      title: 'POOL.INFO.TOTAL',
      value: 'POOL.INFO.TOTAL_VALUE',
      vValues: { amount: totalAmount, symbol },
    },
    {
      id: '02',
      title: 'POOL.INFO.AVAILABLE',
      value: 'POOL.INFO.AVAILABLE_VALUE',
      vValues: { amount: availableAmount, symbol },
    },
    {
      id: '03',
      title: 'POOL.INFO.BORROWED',
      value: 'POOL.INFO.BORROWED_VALUE',
      vValues: { amount: borrowedAmount, symbol },
    },
    {
      id: '04',
      title: 'POOL.INFO.APY',
      value: 'POOL.INFO.APY_VALUE',
      vValues: { amount: 8.57 },
    },
  ];

  return <ValuesList title="POOL.INFO.TITLE" list={valuesList} />;
};

export default memo(PoolInfo);
