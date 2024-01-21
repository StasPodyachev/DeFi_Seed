import PaletteTheme from './PaletteTheme';

const MuiSkeletonTheme = {
  styleOverrides: {
    root: {
      backgroundColor: PaletteTheme.grey[400],
    },
  },
  defaultProps: {
    variant: 'rounded',
  },
};

export default MuiSkeletonTheme;
