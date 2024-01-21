import { spacing } from './handlers';
import PaletteTheme from './PaletteTheme';

const MuiButtonTheme = {
  styleOverrides: {
    root: {
      borderRadius: spacing(1),
      textTransform: 'none',

      '&:hover': {
        opacity: 0.8,
      },

      '&.Mui-disabled': {
        background: 'linear-gradient(74.31deg, #D8D8D8 0%, #626263 80.73%)',
      },
    },
    containedPrimary: {
      backgroundColor: PaletteTheme.secondary.main,

      '&:hover': {
        backgroundColor: PaletteTheme.secondary.main,
      },
    },
    containedSecondary: {
      background: 'linear-gradient(74.31deg, #D8D8D8 0%, #626263 80.73%)',

      '&:hover': {
        background: 'linear-gradient(74.31deg, #D8D8D8 0%, #626263 80.73%)',
      },
    },
    sizeSmall: {
      minHeight: spacing(4.5),
    },
    sizeMedium: {
      minHeight: spacing(6),
    },
  },
  defaultProps: {
    disableRipple: true,
    variant: 'contained',
  },
};

export default MuiButtonTheme;
