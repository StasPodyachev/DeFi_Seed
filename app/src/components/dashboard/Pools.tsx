import { FC, MouseEvent } from 'react';

import { redirect } from '@utils/navigation';
import ROUTES from '@constants/routes';
import ValuesList, { ValuesListProps } from '../common/ValuesList';
import Button from '../common/buttons/Button';

export type DashboardPoolsProps = {
  ListProps: ValuesListProps;
};

const DashboardPools: FC<DashboardPoolsProps> = ({ ListProps }): JSX.Element => {
  const onClickDepositWithdraw = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    redirect(ROUTES.POOL);
  };

  return (
    <ValuesList title="DASHBOARD.MY_POOLS" {...ListProps}>
      <Button title="COMMON.DEPOSIT_WITHDRAW" component="a" href={ROUTES.POOL} onClick={onClickDepositWithdraw} />
    </ValuesList>
  );
};

export default DashboardPools;
