import React from 'react';
import { ListItem } from '@mui/material';
import { format } from 'date-fns';

export const TimePeriodListItem = ({
  timePeriod,
}: {
  timePeriod: Interval;
}) => {
  const { start, end } = timePeriod;

  return (
    <ListItem dense sx={{ pr: 2 }}>
      {`• ${format(start, 'h:mmaaaaa')} - ${format(end, 'h:mmaaaaa')}`}
    </ListItem>
  );
};
