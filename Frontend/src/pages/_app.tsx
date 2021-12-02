import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { GlobalStyles } from '../styles/global-styles';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <GlobalStyles />
        </ThemeProvider>
      </CookiesProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
