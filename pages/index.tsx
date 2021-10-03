import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Cookies from 'cookies';
import { getAuthUrl } from '../src/api-calls/google-auth';
import {
  Badge,
  Chip,
  Container,
  Stack,
  Typography,
  Box,
  Button,
  Grid,
  useTheme,
} from '@mui/material';
import { useCalendarContext } from '../src/components/calendar-provider';
import { authenticate } from '../src/api-calls/authenticate';
import { useRouter } from 'next/router';
import { CalendarList } from '../src/components/calendar-list/calendar-list';
import { FreeBusyList } from '../src/components/free-busy-list/free-busy-list';
import { Settings } from '../src/components/settings/settings';
import { Header } from '../src/components/header';
import { ButtonBar } from '../src/components/settings/button-bar';
import CopyToClipboard from 'react-copy-to-clipboard';
import React from 'react';

const Home: NextPage = ({ authUrl, authenticated }: any) => {
  const { calendars, freeBusyData } = useCalendarContext();
  const router = useRouter();
  const theme = useTheme();

  return (
    <Container maxWidth={'sm'} sx={{ bgcolor: 'white', height: '100vh' }}>
      <Header authUrl={authUrl} authenticated={authenticated} />
      <Stack>
        <Typography variant={'h5'}>Settings</Typography>
        <ButtonBar />
      </Stack>
      <Stack>
        <Typography variant={'h4'}>Free Times</Typography>
        <FreeBusyList />
      </Stack>
    </Container>
  );
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const { req, res } = context;

  const { auth, authenticated, token } = await authenticate(req, res);

  if (token) {
    const cookies = new Cookies(req!, res!);
    cookies.set('token', JSON.stringify(token), {
      expires: new Date(token.expiry_date!),
      httpOnly: true,
    });
  }

  return {
    props: {
      authenticated,
      authUrl: getAuthUrl(),
    },
  };
}
