import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { CalendarsButton } from '../calendar-list/calendars-button';
import { StartDateButton } from '../date-range/start-date-button';
import { NumberOfDaysButton } from '../date-range/number-of-days-button';
import React, { PropsWithChildren } from 'react';
import { SettingsButton } from './settings-button';
import { MeetingLength } from './meeting-length';
import { MeetingLengthButton } from './meeting-length-button';

function NoWrap({ children }: PropsWithChildren<{}>) {
  return (
    <Box component={'span'} sx={{ whiteSpace: 'nowrap' }}>
      {children}
    </Box>
  );
}

export function ButtonBar() {
  return (
    <Box
      sx={{
        borderRadius: '1rem',
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: 'palette.secondary',
        p: 2,
        marginBottom: 2,
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
      }}
    >
      <Typography sx={{ fontSize: '1.5rem' }}>
        Find <MeetingLengthButton /> of free time in <CalendarsButton /> for{' '}
        <NumberOfDaysButton /> starting <StartDateButton />, on{' '}
        <SettingsButton id='rays-of-week' label={'Weekdays'}>
          <div />
        </SettingsButton>
        , between{' '}
        <NoWrap>
          <SettingsButton id='time-range' label={'10:00am and 6:00pm'}>
            <div />
          </SettingsButton>
          ,
        </NoWrap>{' '}
      </Typography>
    </Box>
  );
}

const SettingsButtonLabel = ({ children }: { children: string }) => (
  <Typography
    sx={{
      fontSize: 'caption.fontSize',
    }}
    color={'gray'}
  >
    {children}
  </Typography>
);
