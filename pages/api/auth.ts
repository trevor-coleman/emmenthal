import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../../src/api-calls/authenticate';
import Cookies from 'cookies';
import { getFreeBusy } from '../../src/api-calls/free-busy';
import { google, oauth2_v2 } from 'googleapis';
import { getAuthUrl } from '../../src/api-calls/google-auth';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const { auth, authenticated, token } = await authenticate(req, res);

  let user: oauth2_v2.Schema$Userinfo | undefined;
  if (!authenticated) {
    return res.status(401).json({ authUrl: getAuthUrl() });
  }

  if (token) {
    const cookies = new Cookies(req!, res!);
    cookies.set('token', JSON.stringify(token), {
      expires: new Date(token.expiry_date!),
      httpOnly: true,
    });

    google.options({ auth });

    try {
      const userRes = await google.oauth2('v2').userinfo.get({});
      console.log(userRes.data);
      user = userRes?.data;
    } catch (e) {
      console.log('error');
    }
  }

  res.status(200).json({ user, authUrl: getAuthUrl() });
}
