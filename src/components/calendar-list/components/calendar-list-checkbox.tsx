import React, { ChangeEvent } from 'react';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { CalendarItem } from '../calendar';

interface CalendarListCheckboxProps {
  calendar: CalendarItem;
  checked: boolean;
  onCheck: (e: ChangeEvent<HTMLInputElement>) => void;
  isPrimary?: boolean;
}

export const CalendarListCheckbox = ({
  isPrimary,
  calendar,
  onCheck,
  checked,
}: CalendarListCheckboxProps) => {
  console.log('calendar', calendar);
  const { summary, id } = calendar;

  const displayName =
    summary!.length < 50 ? summary : summary!.slice(0, 30) + '...';

  return (
    <FormControlLabel
      sx={{
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        wordBreak: 'break-all',
      }}
      control={
        <Checkbox checked={checked} onChange={onCheck} name={id ?? undefined} />
      }
      label={
        <Typography sx={{ fontWeight: isPrimary ? '600' : '400' }}>
          {displayName?.toString() ?? 'Unnamed Calendar'}
        </Typography>
      }
    />
  );
};
