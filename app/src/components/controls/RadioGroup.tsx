import { FC, MouseEvent, memo } from 'react';
import styled from '@emotion/styled';
import Flex from '@mui/material/Stack';

import theme from '@theme';
import Button from '../common/buttons/Button';
import SafeText from '../common/text/SafeText';
import Label, { LabelProps } from './Label';

type StyledItemProps = {
  theme: { isActive: boolean };
};

const ItemsWrap = styled(Flex)({
  overflow: 'auto',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    width: 0,
  },
});

const StyledItem = styled(Button)<StyledItemProps>(({ theme: { isActive } }) => ({
  minWidth: 48,
  minHeight: 32,
  padding: theme.spacing(0.5, 1),
  backgroundColor: !isActive ? theme.palette.primary.main : undefined,

  '& span': {
    color: !isActive ? theme.palette.grey[400] : undefined,
  },

  '&:hover': {
    opacity: 1,

    [theme.breakpoints.down('md')]: {
      backgroundColor: !isActive ? theme.palette.primary.main : undefined,
    },
  },
}));

type ItemProps = {
  name: string;
  value: string;
};

export type RadioGroupProps = {
  value: string;
  items: Array<ItemProps>;
  label: string;
  LabelProps: Omit<LabelProps, 'label'>;
  onChange: (value: ItemProps) => void;
};

const RadioGroup: FC<RadioGroupProps> = ({ value, items, label, LabelProps, onChange }): JSX.Element => {
  const handleClick = (newValue: ItemProps) => (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange(newValue);
  };

  return (
    <Flex gap={1} flexDirection="column">
      {label && <Label {...LabelProps} label={label} />}

      <ItemsWrap gap={1} justifyContent="space-between">
        {items.map((item) => (
          <StyledItem
            key={item.value}
            component="div"
            onClick={handleClick(item)}
            theme={{ isActive: value === item.value }}
          >
            <SafeText content={item.name} variant="body1" fontWeight={600} />
          </StyledItem>
        ))}
      </ItemsWrap>
    </Flex>
  );
};

export default memo(RadioGroup);
