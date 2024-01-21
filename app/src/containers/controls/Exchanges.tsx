import { FC, useMemo } from 'react';

import useTypedSelector from '@hooks/useTypedSelector';
import { EXCHANGERS } from '@constants/dictionaries';
import { Select, SelectProps } from '@components';

const Exchanges: FC<Omit<SelectProps, 'items'>> = (props): JSX.Element => {
  const { chainId } = useTypedSelector((state) => state.user);
  const exchanges = useMemo(() => EXCHANGERS.filter((e) => e.value === '0'), [chainId]);

  return <Select {...props} items={exchanges} />;
};

export default Exchanges;
