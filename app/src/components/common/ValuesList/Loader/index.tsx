import { FC, memo } from 'react';

import ListWrap from '../ListWrap';
import LoaderItem from './Item';

const ValuesListLoader: FC = (): JSX.Element => (
  <ListWrap>
    <LoaderItem />
    <LoaderItem />
    <LoaderItem />
  </ListWrap>
);

export default memo(ValuesListLoader);
