import { Stack } from '@mui/material';
import React from 'react';
import { format, startOfTomorrow } from 'date-fns';
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
        {date.days.sort().map((d, index) => (
          <div key={daysOfTheWeek[index]}>{daysOfTheWeek[index]}</div>
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
