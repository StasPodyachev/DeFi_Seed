import { spacing } from './handlers';
import PaletteTheme from './PaletteTheme';

const MuiDrawerTheme = {
  styleOverrides: {
    paper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: spacing(4),
      backgroundColor: PaletteTheme.primary.dark,
    },
  },
  defaultProps: {
    anchor: 'right',
  },
};

export default MuiDrawerTheme;
