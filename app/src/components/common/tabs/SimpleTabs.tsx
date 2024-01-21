import { FC, SyntheticEvent, useState, Fragment } from 'react';
import styled from '@emotion/styled';
import TabsComponent from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import theme from '@theme';
import TabElements, { Elements } from './Tabs/TabElements';
import Text from '../text/Text';

const StyledTabs = styled(TabsComponent)({
  minHeight: theme.spacing(4),

  '& .MuiTabs-flexContainer': {
    gap: theme.spacing(2),
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 0.5),
  },

  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.common.white,
  },
});

const StyledTab = styled(Tab)({
  padding: theme.spacing(0.5, 1),

  '&.Mui-selected': {
    backgroundColor: 'transparent',
  },
});

export type SimpleTabsProps = {
  tabLabels: Array<string>;
  tabElements: Elements;
};

const SimpleTabs: FC<SimpleTabsProps> = ({ tabLabels, tabElements }): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    e.stopPropagation();
    setValue(newValue);
  };

  return (
    <Fragment>
      <StyledTabs value={value} onChange={handleChange} aria-label="tabs" indicatorColor="secondary">
        {tabLabels.map((tabLabel, index) => (
          <StyledTab key={tabLabel} label={<Text tid={tabLabel} variant="subtitle2" />} id={`tab-${index}`} />
        ))}
      </StyledTabs>
      <TabElements elements={tabElements} value={value} padding={1} />
    </Fragment>
  );
};

export default SimpleTabs;
