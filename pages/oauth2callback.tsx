import React from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import Cookies from 'cookies';
import { getToken } from '../src/api-calls/get-token';
import { getAuth } from '../src/api-calls/google-auth';
import { Credentials } from 'google-auth-library';

export default function Oauth2callback({
  token,
  success,
}: {
  token: any;
  success: boolean;
}) {
  const router = useRouter();

  console.log(success, token);

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

  console.log('code', code);

  let token: Credentials | null;
  let success: boolean = false;

  try {
    token = await getToken(auth, code);
    console.log(token);
    success = true;
  } catch (e) {
    console.error(e);
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

  console.log(props);

  return {
    props, // will be passed to the page component as props
  };
}
