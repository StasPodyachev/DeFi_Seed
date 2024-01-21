import { pxToRem, spacing } from './handlers';
import PaletteTheme from './PaletteTheme';

const MuiInputTheme = {
  styleOverrides: {
    root: {
      minHeight: spacing(8),
      borderRadius: spacing(1),
      backgroundColor: PaletteTheme.primary.main,
      color: PaletteTheme.common.white,

      '&.Mui-error': {
        color: PaletteTheme.error.main,
      },
    },
    input: {
      paddingRight: spacing(2),
      paddingLeft: spacing(2),
      fontSize: pxToRem(20),
      lineHeight: pxToRem(28),
      fontWeight: 600,
      textAlign: 'right',

      '&.Mui-disabled': {
        WebkitTextFillColor: PaletteTheme.common.white,
      },

      '&[type=number]::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },

      '&[type=number]::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },

      '&[type=number]': {
        MozAppearance: 'textfield',
      },
    },
  },
  defaultProps: {
    disableUnderline: true,
  },
};

export default MuiInputTheme;
