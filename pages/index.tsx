import type { NextPage, NextPageContext } from 'next';
import Cookies from 'cookies';
import { getAuthUrl } from '../src/api-calls/google-auth';
import { Container, Typography, Box, useTheme } from '@mui/material';
import {
  CalendarProvider,
  useCalendarContext,
} from '../src/components/calendar-provider';
import { authenticate } from '../src/api-calls/authenticate';
import { useRouter } from 'next/router';
import { FreeBusyList } from '../src/components/free-busy-list/free-busy-list';
import { Header } from '../src/components/header';
import { ButtonBar } from '../src/components/settings/button-bar';
import React from 'react';
import { AuthProvider } from '../src/components/auth-provider';
import { google, oauth2_v2 } from 'googleapis';

const Home: NextPage = ({ authUrl, authenticated, user }: any) => {
  const { calendars, freeBusyData } = useCalendarContext();
  const router = useRouter();
  const theme = useTheme();

  return (
    <AuthProvider authenticated={authenticated} authUrl={authUrl} user={user}>
      <CalendarProvider>
        <Container maxWidth={'md'} sx={{ bgcolor: 'white', height: '100vh' }}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <Box flexGrow={0}>
              <Header />
            </Box>
            <Box flexGrow={0}>
              <ButtonBar />
            </Box>
            {authenticated ? (
              <>
                <Box flexGrow={0}>
                  <Typography variant={'h4'}>Free Times</Typography>
                </Box>
                <Box flexGrow={1} sx={{ overflow: 'scroll' }}>
                  <FreeBusyList />
                </Box>
              </>
            ) : (
              <div />
            )}
          </Box>
        </Container>
      </CalendarProvider>
    </AuthProvider>
  );
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const { req, res } = context;
  let user: oauth2_v2.Schema$Userinfo | undefined;

  const { auth, authenticated, token } = await authenticate(req, res);

  if (token) {
    const cookies = new Cookies(req!, res!);
    cookies.set('token', JSON.stringify(token), {
      expires: new Date(token.expiry_date!),
      httpOnly: true,
    });
    google.options({ auth });

    try {
      const userRes = await google.oauth2('v2').userinfo.get({});
      console.log('userRes:', userRes);
      user = userRes?.data;
    } catch {}
  }

  return {
    props: {
      authenticated,
      authUrl: getAuthUrl(),
      user: user ?? null,
    },
  };
}
