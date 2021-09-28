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
import { daysOfTheWeek, DaysOfTheWeek } from './days-of-the-week';
import CollapsingSection from '../collapsingSection';

export function Settings() {
  const { options, setOptions } = useCalendarOptions();

  const { time, date } = options;

  const PersistentSettings = () => (
    <Stack>
      <Stack direction={'row'} spacing={1}>
        <div>{format(date.customDate ?? startOfTomorrow(), 'EEE LLL do')}</div>
        <div>{`+${date.range} days`}</div>
      </Stack>

      <Stack direction={'row'} spacing={1}>
        {date.days.sort().map((d) => (
          <div key={daysOfTheWeek[d]}>{daysOfTheWeek[d]}</div>
        ))}
      </Stack>
    </Stack>
  );

  return (
    <CollapsingSection
      title={'Settings'}
      closedComponent={<PersistentSettings />}
    >
      <Stack spacing={2} sx={{ pb: 2 }}>
        <Stack direction={'row'} spacing={2} sx={{ pt: 2 }}>
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
            renderInput={({ value, ...params }: any) => (
              <TextField {...params} />
            )}
          />
          <TextField
            label={'Days (1-14)'}
            value={!date.range || isNaN(date.range) ? '' : date.range}
            type={'number'}
            error={!date.range || isNaN(date.range) || date.range > 14}
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
    </CollapsingSection>
  );
}
