import React, { useState, useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Head from 'next/head';
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
      <NextNProgress />
      <Head>
        <title>OrderHere</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <Layout>
          <NextClientOnly>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
          </NextClientOnly>
          {isLoading ? <Loading /> : <Component {...pageProps} />}
        </Layout>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default MyApp;
