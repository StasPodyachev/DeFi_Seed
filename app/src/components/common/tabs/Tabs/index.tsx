import { FC, SyntheticEvent, useState, ReactNode } from 'react';
import Box from '@mui/material/Box';
import TabsComponent from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import theme from '@theme';
import TabElements, { Elements } from './TabElements';
import TabLabel, { TabLabelProps } from './TabLabel';
import Text from '../../text/Text';

export type TabsProps = {
  title: string;
  tabLabels: Array<TabLabelProps>;
  tabElements: Elements;
  children?: ReactNode;
};

const Tabs: FC<TabsProps> = ({ title, tabLabels, tabElements, children }): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    e.stopPropagation();
    setValue(newValue);
  };

  return (
    <Box position="relative">
      <Text
        tid={title}
        component="h6"
        width="100%"
        textAlign="left"
        fontWeight={600}
        position="absolute"
        top={theme.spacing(0.5)}
      />
      <TabsComponent value={value} onChange={handleChange} aria-label="tabs">
        {tabLabels.map((tabLabel, index) => (
          <Tab key={tabLabel.label} label={<TabLabel {...tabLabel} />} id={`tab-${index}`} />
        ))}
      </TabsComponent>
      <TabElements elements={tabElements} value={value} />
      {children}
    </Box>
  );
};

export default Tabs;
