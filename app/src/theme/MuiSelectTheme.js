import { spacing } from './handlers';
import PaletteTheme from './PaletteTheme';

const MuiSelectTheme = {
  styleOverrides: {
    select: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minHeight: spacing(8),
      backgroundColor: PaletteTheme.primary.main,
      borderRadius: spacing(1),
      boxSizing: 'border-box',
    },
    icon: {
      right: spacing(1),
      color: PaletteTheme.common.white,
    },
  },
  defaultProps: {
    label: null,
    fullWidth: true,
    variant: 'standard',
  },
};

export default MuiSelectTheme;
