import { FC, MouseEvent, memo } from 'react';
import Flex from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
import StarIcon from '@mui/icons-material/Star';

import theme from '@theme';

export type RadioGroupProps = {
  value: number;
  count?: number;
  label?: string;
  onChange: (value: number) => void;
};

const StarGroup: FC<RadioGroupProps> = ({ value = 0, count = 5, onChange }): JSX.Element => {
  const handleClick = (newValue: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange(newValue);
  };

  return (
    <Flex gap={2}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <ButtonBase key={i} onClick={handleClick(i + 1)}>
            <StarIcon
              fontSize="large"
              htmlColor={i + 1 <= value ? theme.palette.error.main : theme.palette.common.white}
            />
          </ButtonBase>
        ))}
    </Flex>
  );
};

export default memo(StarGroup);
