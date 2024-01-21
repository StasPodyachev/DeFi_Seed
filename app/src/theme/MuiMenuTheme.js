import { spacing } from './handlers';
import PaletteTheme from './PaletteTheme';

const MuiMenuTheme = {
  styleOverrides: {
    root: {
      zIndex: 1299,
    },
    paper: {
      borderRadius: spacing(1),
      backgroundColor: PaletteTheme.primary.main,
    },
  },
};

export default MuiMenuTheme;
