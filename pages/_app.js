import React, { useState, useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import Router from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import CssBaseline from '@mui/material/CssBaseline';
import NextClientOnly from '../components/NextClientOnly';
import { store, persistor } from '../store/store';
import Layout from '../layout';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import createTheme from '../theme';
import '../styles/main.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Footer from '../layout/Footer';
import Script from 'next/script';

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
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
      <ReduxProvider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <SessionProvider session={session}>
            <ThemeProvider theme={createTheme()}>
              {/* <Container maxWidth="lg" style={{ padding: 0, margin: 'auto' }}> */}
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
              {/* </Container> */}
              <Footer />
            </ThemeProvider>
          </SessionProvider>
        </PersistGate>
      </ReduxProvider>
    </>
  );
};

export default MyApp;
