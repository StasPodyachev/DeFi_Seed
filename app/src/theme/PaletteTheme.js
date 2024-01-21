import { palette } from './handlers';

const PaletteTheme = {
  ...palette,
  primary: {
    main: '#19122C', // input
    dark: '#090416', // bg
  },
  secondary: {
    light: '#d5b6f6',
    main: '#1969FF', // blue
    dark: '#321978',
  },
  error: {
    main: '#EB5757',
  },
  success: {
    light: '#00C097',
    main: '#31C471',
  },
  grey: {
    500: '#363D45', // hover select item
    400: '#A6A0BB', // tooltip, token, subTitle
  },
};

export default PaletteTheme;
