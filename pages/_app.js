import React, { useState, useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import Router from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import CssBaseline from '@mui/material/CssBaseline';
import NextClientOnly from '../components/NextClientOnly';
import store from '../store/store';
import Layout from '../layout';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import createTheme from '../theme';
import '../styles/main.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
  }, []);

  return (
    <ReduxProvider store={store}>
      <SessionProvider session={session}>
        <ThemeProvider theme={createTheme()}>
          <Container maxWidth="md" style={{ padding: 0, margin: 'auto' }}>
            <CssBaseline />
            <Head>
              <title>OrderHere</title>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <NextNProgress />
            <Layout>
              <NextClientOnly>
                <Toaster position="top-center" reverseOrder={false} />
                <Navbar />
              </NextClientOnly>
              {isLoading ? <Loading /> : <Component {...pageProps} />}
            </Layout>
          </Container>
        </ThemeProvider>
      </SessionProvider>
    </ReduxProvider>
  );
};

export default MyApp;
