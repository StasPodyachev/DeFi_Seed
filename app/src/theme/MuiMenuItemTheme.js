import { spacing } from './handlers';
import PaletteTheme from './PaletteTheme';

const MuiMenuItemTheme = {
  styleOverrides: {
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      paddingTop: spacing(1),
      paddingBottom: spacing(1),

      '&:hover': {
        backgroundColor: PaletteTheme.grey[500],
        borderRadius: spacing(1),
      },
    },
  },
};

export default MuiMenuItemTheme;
