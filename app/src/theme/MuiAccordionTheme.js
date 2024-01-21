import { spacing } from './handlers';
import Palette from './PaletteTheme';

const MuiAccordionTheme = {
  styleOverrides: {
    root: {
      backgroundColor: Palette.primary.main,
      borderRadius: `${spacing(1)} !important`,
    },
  },
  defaultProps: {
    disableGutters: true,
  },
};

export default MuiAccordionTheme;
