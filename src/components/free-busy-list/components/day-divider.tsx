import React from 'react';
import { format } from 'date-fns';
import { ListItem, Typography } from '@mui/material';

export function DayDivider({ interval }: { interval: Interval }) {
  return (
    <ListItem>
      <Typography sx={{ fontWeight: 700 }}>
        {format(interval.start, 'EEE LLL do')}
      </Typography>
    </ListItem>
  );
}
