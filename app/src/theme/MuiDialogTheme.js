import { spacing } from './handlers';
import Palette from './PaletteTheme';

const MuiDialogTheme = {
  styleOverrides: {
    paper: {
      width: `calc(100% - ${spacing(2)})`,
      margin: spacing(1),
      backgroundColor: Palette.primary.dark,
      outline: `1px solid ${Palette.grey[400]}`,
      borderRadius: spacing(2),
    },
  },
  defaultProps: {
    disablePortal: true,
    fullWidth: true,
    maxWidth: 'xs',
  },
};

export default MuiDialogTheme;
