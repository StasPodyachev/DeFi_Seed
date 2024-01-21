import { FC, ReactNode } from 'react';
import Flex from '@mui/material/Stack';

import Text from '../../common/text/Text';
import List, { ListProps } from './List';

export type ValuesListProps = {
  id?: string;
  title?: string | ReactNode;
  tValues?: object;
} & ListProps;

const ValuesList: FC<ValuesListProps> = ({ id, title, tValues = {}, ...props }): JSX.Element => (
  <Flex id={id} gap={1} flexDirection="column" width="inherit">
    {typeof title === 'string' && <Text tid={title} values={tValues} component="h6" fontWeight={600} />}
    {typeof title === 'object' && title}
    <List {...props} />
  </Flex>
);

export default ValuesList;
