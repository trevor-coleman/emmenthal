import { FormControl, FormLabel } from '@mui/material';
import React, { useCallback } from 'react';
import { useCalendarOptions } from '../calendar-provider';

export function DateRange() {
  const { options, setOptions } = useCalendarOptions();

  const { date } = options;

  const handleChange = useCallback(
    (e) => {
      setOptions({
        ...options,
        date: {
          ...options.date,
          range: parseInt(e.target.value),
        },
      });
    },
    [options, setOptions]
  );

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Time Window</FormLabel>
    </FormControl>
  );
}
