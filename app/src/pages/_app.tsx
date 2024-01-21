import React from 'react';
import { createWrapper } from 'next-redux-wrapper';
import { Store } from 'redux';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@theme';
import '@rainbow-me/rainbowkit/styles.css';
import '@services/i18n';
import store, { RootState } from '@services/store';
import { wagmiConfig, chains, rainbowKitConfig } from '@services/wagmi';

export const wrapper = createWrapper<Store<RootState>>(() => store, { debug: false });

type MyAppProps = {
  Component: React.ComponentType<any>;
  pageProps: object;
};

const MyApp = ({ Component, pageProps }: MyAppProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} {...rainbowKitConfig}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  </ThemeProvider>
);

MyApp.getInitialProps = wrapper.getInitialAppProps((appStore) => async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store: appStore }) : {};

  return { pageProps };
});

export default wrapper.withRedux(MyApp);
