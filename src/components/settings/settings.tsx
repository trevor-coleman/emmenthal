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
import { DateRangePicker } from '../date-range/date-range-picker';
import { useCalendarOptions } from '../calendar-provider';
import { daysOfTheWeek, DaysOfTheWeek } from './days-of-the-week';
import CollapsingSection from '../collapsingSection';
import { MeetingLength } from './meeting-length';
import { DateRange } from '../date-range/date-range';
import { TimeRange } from './time-range';

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
        <MeetingLength />
        <DateRange />
        <TimeRange />
        <DaysOfTheWeek />
      </Stack>
    </CollapsingSection>
  );
}
