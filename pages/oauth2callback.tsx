import React from 'react';
import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next';
import Cookies from 'cookies';
import { getToken } from '../src/api-calls/get-token';
import { getAuth } from '../src/api-calls/google-auth';
import withAuthentication from '../src/api-calls/with-authentication';
import { IncomingMessage } from 'connect';
import { ServerResponse } from 'http';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { addDays, fromUnixTime } from 'date-fns';

export default function Oauth2callback({
  token,
  success,
}: {
  token: any;
  success: boolean;
}) {
  const router = useRouter();

  if (success && typeof window !== 'undefined') {
    router.push('/');
  }

  return success ? (
    <div>
      <h1>Authentication Successful... redirecting</h1>
    </div>
  ) : (
    <div>
      <h1>Authentication Failed.</h1>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { query, res, req } = context;

  const auth = getAuth();

  const code: string = (query.code ?? '') as string;

  if (!code)
    return {
      props: {
        code: '',
        token: {},
      },
    };

  let token: Credentials | null;
  let success: boolean = false;

  try {
    token = await getToken(auth, code);
    success = true;
  } catch (e) {
    token = null;
  }

  if (token) {
    const cookies = new Cookies(req!, res!);
    cookies.set('token', JSON.stringify(token), {
      expires: new Date(token.expiry_date!),
      httpOnly: true,
    });
  }

  const props = { token: token, success };

  return {
    props, // will be passed to the page component as props
  };
}
