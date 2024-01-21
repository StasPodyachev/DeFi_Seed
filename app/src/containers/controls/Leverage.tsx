import { FC } from 'react';

import { LEVERAGE } from '@constants/dictionaries';
import { RadioGroup, RadioGroupProps } from '@components';

const Leverage: FC<Omit<RadioGroupProps, 'items'>> = (props): JSX.Element => <RadioGroup {...props} items={LEVERAGE} />;

export default Leverage;
