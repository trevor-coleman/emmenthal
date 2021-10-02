import { Button, Stack } from '@mui/material';
import { CalendarsButton } from '../calendar-list/CalendarsButton';

export function ButtonBar() {
  return (
    <Stack direction={'row'} spacing={2}>
      <CalendarsButton />
      <Button variant={'outlined'}>Starting Tuesday</Button>
      <Button variant={'outlined'}>1 Week</Button>
      <Button variant={'outlined'}>10:00AM - 6:00PM</Button>
      <Button variant={'outlined'}>Weekdays Only</Button>
    </Stack>
  );
}
