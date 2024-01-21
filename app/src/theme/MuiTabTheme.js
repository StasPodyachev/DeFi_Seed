import { pxToRem, spacing } from './handlers';
import PaletteTheme from './PaletteTheme';

const MuiTabTheme = {
  styleOverrides: {
    root: {
      minWidth: 'fit-content',
      minHeight: pxToRem(32),
      padding: spacing(0.5, 2),
      borderRadius: spacing(1),
      textTransform: 'initial',
      overflow: 'inherit',

      '&.Mui-selected': {
        backgroundColor: PaletteTheme.secondary.main,

        '& > span': {
          color: PaletteTheme.common.white,
        },
      },

      '& > span': {
        color: PaletteTheme.grey[400],
      },
    },
  },
  defaultProps: {
    disableRipple: true,
  },
};

export default MuiTabTheme;
