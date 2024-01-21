import { FC } from 'react';
import { ConnectButton as ConnectButtonComponent } from '@rainbow-me/rainbowkit';
import Box from '@mui/material/Box';

type ConnectButtonProps = {
  fixed?: boolean;
  fullWidth?: boolean;
};

const ConnectButton: FC<ConnectButtonProps> = ({ fullWidth, fixed }): JSX.Element => (
  <Box
    position={fixed ? 'fixed' : undefined}
    top={fixed ? '10%' : undefined}
    left={fixed ? 'calc(50% - 67px)' : undefined}
    width={fullWidth ? '100%' : 'auto'}
    sx={{
      div: {
        justifyContent: 'flex-end',
        fontSize: '14px !important',
        fontWeight: '400 !important',
      },
      button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: fullWidth ? '100%' : undefined,
      },
    }}
  >
    <ConnectButtonComponent
      chainStatus="icon"
      showBalance
      accountStatus={{ largeScreen: 'full', smallScreen: 'address' }}
    />
  </Box>
);

export default ConnectButton;
