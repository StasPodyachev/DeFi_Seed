import { spacing } from './handlers';
import Palette from './PaletteTheme';

const MuiDialogContentTheme = {
  styleOverrides: {
    root: {
      padding: spacing(2),
      scrollbarWidth: 'thin',

      '&::-webkit-scrollbar': {
        width: '4px',
      },

      '&::-webkit-scrollbar-track': {
        borderRadius: 4,
      },

      '&::-webkit-scrollbar-thumb': {
        borderRadius: spacing(0.5),
        backgroundColor: Palette.grey[400],
      },
    },
  },
};

export default MuiDialogContentTheme;
