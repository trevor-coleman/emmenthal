import React from 'react';
import emmenthalLogo from '../../public/emmenthal-logo.png';
import Image from 'next/image';
import { Box, Typography, Link, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from './auth-provider';

export const Header = () => {
  const router = useRouter();
  const { authUrl, authenticated, signIn } = useAuth();
  return (
    <header>
      <Box sx={{ my: 2 }}>
        <Stack>
          <Stack
            sx={{
              display: { xs: 'flex', sm: 'none' },
              alignItems: 'flex-start',
            }}
            spacing={2}
            direction={'row'}
          >
            <Box sx={{ width: '3rem' }}>
              <Image src={emmenthalLogo} />
            </Box>
            <Stack>
              <Typography variant={'h3'} sx={{ fontWeight: 700 }}>
                <Link
                  href={'/'}
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    ':visited': { color: 'inherit' },
                  }}
                >
                  Emmenthal
                </Link>
              </Typography>
              <Typography
                variant={'subtitle2'}
                sx={{ fontSize: '1.25rem', pl: '0.2rem' }}
              >
                Find Holes in your Schedule
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
          }}
        >
          <Typography variant={'h3'} sx={{ fontSize: '1.75rem', pl: '6.5rem' }}>
            Find Holes in your Schedule
          </Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Box sx={{ width: '5rem' }}>
              <Image src={emmenthalLogo} />
            </Box>
            <Typography variant={'h1'}>Emmenthal</Typography>
          </Stack>
        </Box>
      </Box>
    </header>
  );
};
