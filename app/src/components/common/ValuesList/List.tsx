import { FC, Fragment, ElementType, ReactNode } from 'react';

import ListWrap from './ListWrap';
import ListItem from './ListItem';

type Item = {
  [keys: string]: unknown;
};

export type ListProps = {
  list: Array<Item>;
  ItemComponent?: ElementType;
  children?: ReactNode;
  background?: string;
};

const List: FC<ListProps> = ({ list = [], ItemComponent = ListItem, background = '', children }): JSX.Element => {
  if (list.length === 0) {
    return <Fragment />;
  }

  return (
    <ListWrap background={background}>
      {list.map((item) => (
        <ItemComponent key={item.id} {...item} />
      ))}
      {children}
    </ListWrap>
  );
};

export default List;
