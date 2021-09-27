import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { getAuth } from '../../src/api-calls/google-auth';
import { authenticate } from '../../src/api-calls/authenticate';
import Cookies from 'cookies';

const calendars: NextApiHandler = async (req, res) => {
  const { auth, authenticated, token } = await authenticate(req, res);

  if (!authenticated) {
    return res
      .status(401)
      .send('You do not have permission to access this resource.');
  }
  const calendar = await google.calendar({ version: 'v3', auth });

  const list = await calendar.calendarList.list();

  const {
    data: { items },
  } = list;

  if (token) {
    const cookies = new Cookies(req!, res!);
    cookies.set('token', JSON.stringify(token), {
      expires: new Date(token.expiry_date!),
      httpOnly: true,
    });
  }

  res.status(200).json(items);
};

export default calendars;
