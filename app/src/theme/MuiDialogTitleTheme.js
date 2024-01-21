import { spacing } from './handlers';

const MuiDialogTitleTheme = {
  styleOverrides: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      padding: spacing(2),
    },
  },
  defaultProps: {
    component: 'div',
  },
};

export default MuiDialogTitleTheme;
