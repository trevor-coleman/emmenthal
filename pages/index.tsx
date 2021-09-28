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
} from '@mui/material';
import { useCalendarContext } from '../src/components/calendar-provider';
import { authenticate } from '../src/api-calls/authenticate';
import { useRouter } from 'next/router';
import { CalendarList } from '../src/components/calendar-list/calendar-list';
import { FreeBusyList } from '../src/components/free-busy-list/free-busy-list';
import { Settings } from '../src/components/settings/settings';
import { Header } from '../src/components/header';

const Home: NextPage = ({ authUrl, authenticated }: any) => {
  const { calendars, freeBusyData } = useCalendarContext();
  const router = useRouter();

  return (
    <Container>
      <Header authUrl={authUrl} authenticated={authenticated} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Settings />
            <CalendarList />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <FreeBusyList />
        </Grid>
      </Grid>
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
