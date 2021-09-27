import { getAuth } from './google-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import { Credentials, OAuth2Client } from 'google-auth-library';
import cookie from 'cookie';

export function authenticate(
  req: NextApiRequest | IncomingMessage | undefined,
  res: NextApiResponse | ServerResponse | undefined
): Promise<{
  auth: OAuth2Client;
  authenticated: boolean;
  token?: Credentials | null;
}> {
  const auth = getAuth();
  let tokenString: string | null;

  return new Promise((resolve) => {
    let tokenString: string;
    if (!req || !res) return resolve({ auth, authenticated: false });
    if ('cookies' in req) {
      tokenString = req?.cookies?.token ?? null;
    } else {
      const cookieString = req.headers.cookie;
      const cookies = cookieString ? cookie.parse(cookieString) : {};
      tokenString = cookies.token ?? null;
    }

    if (tokenString?.startsWith('token')) tokenString = tokenString.slice(8);

    const token: Credentials = JSON.parse(tokenString);
    if (token === null) {
      return resolve({ auth, authenticated: false });
    }

    try {
      auth.setCredentials(token);
      return resolve({ auth, authenticated: true, token });
    } catch (e) {
      return resolve({ auth, authenticated: false });
    }
  });
}
