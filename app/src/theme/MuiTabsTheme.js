import { spacing } from './handlers';
import PaletteTheme from './PaletteTheme';

const MuiTabsTheme = {
  styleOverrides: {
    root: {
      overflow: 'initial',
    },
    scroller: {
      overflow: 'inherit !important',
    },
    flexContainer: {
      gap: spacing(2),
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  },
  defaultProps: {
    indicatorColor: null,
  },
};

export default MuiTabsTheme;
