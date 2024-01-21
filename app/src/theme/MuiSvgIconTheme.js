import { pxToRem } from './handlers';
import PaletteTheme from './PaletteTheme';

const MuiSvgIconTheme = {
  styleOverrides: {
    fontSizeSmall: {
      fontSize: pxToRem(16),
    },
  },
  defaultProps: {
    htmlColor: PaletteTheme.common.white,
  },
};

export default MuiSvgIconTheme;
