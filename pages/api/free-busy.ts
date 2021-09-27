import { NextApiRequest, NextApiResponse } from 'next';
import { getFreeBusy } from '../../src/api-calls/free-busy';
import withAuthentication from '../../src/api-calls/with-authentication';
import { authenticate } from '../../src/api-calls/authenticate';
import Cookies from 'cookies';

export default async function freeBusy(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { auth, authenticated, token } = await authenticate(req, res);

  if (!authenticated) {
    return res.status(401).end();
  }

  if (token) {
    const cookies = new Cookies(req!, res!);
    cookies.set('token', JSON.stringify(token), {
      expires: new Date(token.expiry_date!),
      httpOnly: true,
    });
  }

  const result = await getFreeBusy(req, res, auth);

  res.status(200).json(result);
}
