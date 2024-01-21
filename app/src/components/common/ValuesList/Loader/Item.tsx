import { FC, memo } from 'react';
import Skeleton from '@mui/material/Skeleton';

const ValuesListItemLoader: FC = (): JSX.Element => <Skeleton height={24} />;

export default memo(ValuesListItemLoader);
