import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { AppProps } from 'next/app';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import { GlobalStyles } from '../styles/global-styles';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import storeConfig from 'store/storeConfig';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <CookiesProvider>
        <Provider store={storeConfig}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
            <GlobalStyles />
          </ThemeProvider>
        </Provider>
      </CookiesProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
