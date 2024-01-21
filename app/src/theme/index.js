import { createTheme } from '@mui/material/styles';

import typography from './typography';
import PaletteTheme from './PaletteTheme';
import MuiTypographyTheme from './MuiTypographyTheme';
import MuiSvgIconTheme from './MuiSvgIconTheme';
import MuiTooltipTheme from './MuiTooltipTheme';
import MuiSelectTheme from './MuiSelectTheme';
import MuiMenuTheme from './MuiMenuTheme';
import MuiMenuItemTheme from './MuiMenuItemTheme';
import MuiInputTheme from './MuiInputTheme';
import MuiDrawerTheme from './MuiDrawerTheme';
import MuiInputBaseTheme from './MuiInputBaseTheme';
import MuiButtonTheme from './MuiButtonTheme';
import MuiButtonBaseTheme from './MuiButtonBaseTheme';
import MuiStackTheme from './MuiStackTheme';
import MuiSkeletonTheme from './MuiSkeletonTheme';
import MuiTabsTheme from './MuiTabsTheme';
import MuiTabTheme from './MuiTabTheme';
import MuiDialogTheme from './MuiDialogTheme';
import MuiDialogTitleTheme from './MuiDialogTitleTheme';
import MuiDialogContentTheme from './MuiDialogContentTheme';
import MuiDialogActionsTheme from './MuiDialogActionsTheme';
import MuiAccordionTheme from './MuiAccordionTheme';
import MuiAccordionSummaryTheme from './MuiAccordionSummaryTheme';
import MuiAccordionDetailsTheme from './MuiAccordionDetailsTheme';

const theme = createTheme({
  typography,
  palette: PaletteTheme,
  components: {
    MuiTypography: MuiTypographyTheme,
    MuiSvgIcon: MuiSvgIconTheme,
    MuiTooltip: MuiTooltipTheme,
    MuiSelect: MuiSelectTheme,
    MuiMenu: MuiMenuTheme,
    MuiMenuItem: MuiMenuItemTheme,
    MuiInput: MuiInputTheme,
    MuiDrawer: MuiDrawerTheme,
    MuiInputBase: MuiInputBaseTheme,
    MuiButton: MuiButtonTheme,
    MuiButtonBase: MuiButtonBaseTheme,
    MuiStack: MuiStackTheme,
    MuiSkeleton: MuiSkeletonTheme,
    MuiTabs: MuiTabsTheme,
    MuiTab: MuiTabTheme,
    MuiDialog: MuiDialogTheme,
    MuiDialogTitle: MuiDialogTitleTheme,
    MuiDialogContent: MuiDialogContentTheme,
    MuiDialogActions: MuiDialogActionsTheme,
    MuiAccordion: MuiAccordionTheme,
    MuiAccordionSummary: MuiAccordionSummaryTheme,
    MuiAccordionDetails: MuiAccordionDetailsTheme,
  },
});

export default theme;
