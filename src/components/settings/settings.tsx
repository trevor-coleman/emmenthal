import {
  Box,
  Stack,
  TextField,
  Typography,
  TextFieldProps,
} from '@mui/material';
import React, { forwardRef, useState, MouseEventHandler } from 'react';
import { DatePicker, TimePicker } from '@mui/lab';
import {
  addDays,
  format,
  getDay,
  isTomorrow,
  set,
  startOfTomorrow,
} from 'date-fns';
import { DateRangePicker } from './date-range-picker';
import { useCalendarOptions } from '../calendar-provider';
import { DaysOfTheWeek } from './days-of-the-week';

export function Settings() {
  const { options, setOptions } = useCalendarOptions();

  const { time, date } = options;

  return (
    <Stack spacing={2}>
      <Typography variant={'h6'}>Settings</Typography>
      <Stack direction={'row'} spacing={1}>
        <DatePicker
          label='Start Date'
          value={date.customDate ?? startOfTomorrow()}
          onChange={(newValue: Date | null) => {
            setOptions({
              ...options,
              date: {
                ...options.date,
                customDate:
                  newValue === null || isTomorrow(newValue) ? null : newValue,
              },
            });
          }}
          renderInput={({ value, ...params }: any) => <TextField {...params} />}
        />
        <TextField
          label={'Days'}
          value={date.range}
          type={'number'}
          onChange={(e) => {
            setOptions({
              ...options,
              date: {
                ...options.date,
                range: parseInt(e.target.value),
              },
            });
          }}
        />
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <TimePicker
          label='From'
          value={time.start}
          onChange={(newValue) => {
            setOptions({
              ...options,
              time: {
                ...options.time,
                start: newValue,
              },
            });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label='To'
          value={time.end}
          onChange={(newValue) => {
            setOptions({
              ...options,
              time: {
                ...options.time,
                end: newValue,
              },
            });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
      <DaysOfTheWeek />
    </Stack>
  );
}
