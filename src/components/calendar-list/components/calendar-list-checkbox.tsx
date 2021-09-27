import React, { ChangeEvent } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { CalendarItem } from '../calendar';

interface CalendarListCheckboxProps {
  calendar: CalendarItem;
  checked: boolean;
  onCheck: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CalendarListCheckbox = ({
  calendar,
  onCheck,
  checked,
}: CalendarListCheckboxProps) => {
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
      label={displayName?.toString() ?? 'No name'}
    />
  );
};
