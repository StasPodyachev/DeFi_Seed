import { spacing } from './handlers';
import PaletteTheme from './PaletteTheme';

const MuiTooltipTheme = {
  styleOverrides: {
    tooltip: {
      padding: spacing(1.5),
      maxWidth: 300,
      minHeight: 30,
      backgroundColor: PaletteTheme.primary.main,
      border: `1px solid ${PaletteTheme.grey[400]}`,
      borderRadius: spacing(1),
    },
    arrow: {
      '&::before': {
        backgroundColor: PaletteTheme.primary.main,
        border: `1px solid ${PaletteTheme.grey[400]}`,
      },
    },
    tooltipPlacementBottom: {
      marginTop: `${spacing(1)} !important`,
    },
    tooltipPlacementLeft: {
      marginRight: `${spacing(1)} !important`,
    },
  },
  defaultProps: {
    arrow: true,
    enterTouchDelay: 100,
    leaveTouchDelay: 0,
  },
};

export default MuiTooltipTheme;
