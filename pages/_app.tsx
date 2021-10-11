import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/create-emotion-cache';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CalendarProvider } from '../src/components/calendar-provider';
import '../src/components/settings/button-bar.css';
import { AuthProvider, IAuthContext } from '../src/components/auth-provider';
import { NextPageContext } from 'next';
import { authenticate } from '../src/api-calls/authenticate';

import Cookies from 'cookies';
import { getAuthUrl } from '../src/api-calls/google-auth';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  authContext: IAuthContext;
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    authContext,
  } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CacheProvider value={emotionCache}>
        <CssBaseline />
        <Head>
          <title>Emmenthal</title>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </LocalizationProvider>
  );
}
