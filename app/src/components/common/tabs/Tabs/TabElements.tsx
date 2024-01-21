import React, { FC, Fragment, ReactNode } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

export type Elements = Array<ReactNode>;

type TabElementsProps = {
  elements: Elements;
  value: number;
} & BoxProps;

const TabElements: FC<TabElementsProps> = ({ elements, value, ...props }): JSX.Element => (
  <Fragment>
    {elements.map((element, index) => (
      <Box
        {...props}
        key={index}
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        width="100%"
      >
        {value === index && element}
      </Box>
    ))}
  </Fragment>
);

export default TabElements;
