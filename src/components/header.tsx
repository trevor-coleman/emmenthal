import React from 'react';
// import emmenthalLogo from '../assets/emmenthal-logo.png';
import Image from 'next/image';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export const Header = ({ authUrl }: { authUrl?: string }) => {
  const router = useRouter();
  return (
    <header>
      <a href={'/'}>
        <Typography variant={'h1'}>Emmenthal</Typography>
      </a>
      {authUrl && (
        <Button
          onClick={() => {
            router.push(authUrl);
          }}
        >
          Authorize
        </Button>
      )}
    </header>
  );
};
