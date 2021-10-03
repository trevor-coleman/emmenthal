import { Button, Grid, Stack, Typography } from '@mui/material';
import { CalendarsButton } from '../calendar-list/calendars-button';
import { StartDateButton } from '../date-range/start-date-button';
import { NumberOfDaysButton } from '../date-range/number-of-days-button';
import { PropsWithChildren } from 'react';

export function ButtonBar() {
  return (
    <Stack direction={'column'}>
      <Stack direction={['row', 'column']} spacing={2}>
        <Stack direction={'column'}>
          <SettingsButtonLabel>Calendars: </SettingsButtonLabel>
          <CalendarsButton />
        </Stack>
        <Stack direction={'column'}>
          <SettingsButtonLabel>for: </SettingsButtonLabel>
          <NumberOfDaysButton />
        </Stack>
        <Stack direction={'column'}>
          <SettingsButtonLabel>starting: </SettingsButtonLabel>
          <StartDateButton />
        </Stack>
      </Stack>
      <Stack direction={['row', 'column']} spacing={2}>
        <Stack direction={'column'}>
          <SettingsButtonLabel>between: </SettingsButtonLabel>
          <Button variant={'outlined'}>10:00AM - 6:00PM</Button>
        </Stack>
        <Stack direction={'column'}>
          <SettingsButtonLabel>on: </SettingsButtonLabel>
          <Button variant={'outlined'}>Weekdays Only</Button>
        </Stack>
      </Stack>
    </Stack>
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
