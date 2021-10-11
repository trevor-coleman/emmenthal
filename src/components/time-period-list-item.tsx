import React from 'react';
import { calendar_v3 } from 'googleapis';
import { ListItem, Stack } from '@mui/material';
import { format } from 'date-fns';

export const TimePeriodListItem = ({
  timePeriod,
}: {
  timePeriod: Interval;
}) => {
  const { start, end } = timePeriod;

  return (
    <ListItem dense>
      <Stack direction={'row'} width={'100%'} justifyContent={'flex-start'}>
        {`• ${format(start, 'h:mmaaaaa')} - ${format(end, 'h:mmaaaaa')}`}
      </Stack>
    </ListItem>
  );
};
