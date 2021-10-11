import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { DaysTuple, useCalendarOptions } from '../calendar-provider';
import * as React from 'react';

export const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const DaysOfTheWeek = () => {
  const { options, setOptions } = useCalendarOptions();

  const { days } = options.date;

  function toggleDay(index: number, event: any) {
    const newDays: DaysTuple = [...days];
    newDays[index] = event.target.checked;

    setOptions({
      ...options,
      date: {
        ...options.date,
        days: newDays,
      },
    });
  }
  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Days of the week</FormLabel>
      <FormGroup aria-label='position' row>
        {daysOfTheWeek.map((day, index) => (
          <FormControlLabel
            sx={{ m: 0 }}
            key={day}
            checked={days[index]}
            onChange={(event) => {
              toggleDay(index, event);
            }}
            control={<Checkbox />}
            label={day}
            labelPlacement='bottom'
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
