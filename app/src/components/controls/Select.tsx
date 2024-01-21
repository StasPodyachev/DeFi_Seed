import { FC, Fragment, memo } from 'react';
import Image from 'next/image';
import MenuItem from '@mui/material/MenuItem';
import Flex from '@mui/material/Stack';
import SelectComponent, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import theme from '@theme';
import SafeText from '../common/text/SafeText';

type Item = {
  value: string;
  name: string;
  iconUrl?: string | undefined;
};

const Item: FC<Partial<Item>> = ({ name, iconUrl }): JSX.Element => (
  <Fragment>
    {iconUrl && <Image src={iconUrl} width={28} height={28} alt={name || ''} />}
    {name && <SafeText content={name} variant="h6" fontWeight={600} color={theme.palette.common.white} />}
  </Fragment>
);

export type SelectProps = {
  value: Item;
  items: Array<Item>;
  onChange: (value: Item) => void;
  disabled?: boolean;
};

const Select: FC<SelectProps> = ({ value, items = [], disabled = false, onChange }): JSX.Element => {
  const isOneItem = items.length === 1;

  const handleChange = (e: SelectChangeEvent) => {
    const newValue = items.find((item) => item.value === e.target.value);
    onChange(newValue as Item);
  };

  return (
    <SelectComponent
      value={value.value}
      renderValue={() => (
        <Flex gap={1} alignItems="center">
          <Item name={value.name} iconUrl={value.iconUrl} />
        </Flex>
      )}
      onChange={handleChange}
      IconComponent={isOneItem ? 'span' : KeyboardArrowDownOutlinedIcon}
      MenuProps={{ sx: { display: isOneItem ? 'none' : undefined } }}
      disabled={disabled}
    >
      {items.map(({ value: itemValue, name, iconUrl }) =>
        itemValue !== value.value ? (
          <MenuItem key={name} value={itemValue}>
            <Item name={name} iconUrl={iconUrl} />
          </MenuItem>
        ) : (
          <li key={name} value={itemValue} />
        ),
      )}
    </SelectComponent>
  );
};

export default memo(Select);
