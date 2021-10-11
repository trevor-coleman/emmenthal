import {
  differenceInCalendarWeeks,
  isMonday,
  isTomorrow,
  nextMonday,
  startOfDay,
  startOfToday,
  startOfTomorrow,
} from 'date-fns';
import { Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import React, { useCallback, useMemo } from 'react';
import { useCalendarOptions } from '../calendar-provider';
import { useSettingsButtonOnSelect } from '../settings/settings-button';
import { OptionButton } from '../settings/options-button';

export function StartDate() {
  const { options, setOptions } = useCalendarOptions();
  const onSelect = useSettingsButtonOnSelect();

  const { date } = options;
  const { customDate } = date;

  const setCalendarValue = useCallback(
    (newValue: Date | null) => {
      setOptions({
        ...options,
        date: {
          ...options.date,
          customDate:
            newValue === null || isTomorrow(newValue) ? null : newValue,
        },
      });
      onSelect();
    },
    [options, onSelect]
  );

  const setTomorrow = useCallback(() => {
    setCalendarValue(null);
  }, [setCalendarValue]);

  const setMonday = useCallback(() => {
    setCalendarValue(nextMonday(startOfToday()));
  }, [setCalendarValue]);

  const startDate = useMemo(() => {
    return startOfDay(customDate ?? startOfTomorrow());
  }, [customDate]);

  const { customDateIsTomorrow, customDateIsMonday } = useMemo(() => {
    const customDateIsTomorrow = isTomorrow(startDate);
    const customDateIsMonday =
      isMonday(startOfDay(startDate)) &&
      differenceInCalendarWeeks(startDate, new Date()) <= 1;

    return {
      customDateIsTomorrow,
      customDateIsMonday,
    };
  }, [startDate]);

  return (
    <Stack alignItems={'flex-start'} spacing={2}>
      <DatePicker
        onChange={setCalendarValue}
        label='Start Date'
        value={startDate}
        renderInput={({ value, ...params }: any) => <TextField {...params} />}
      />
      <OptionButton disabled={customDateIsTomorrow} onClick={setTomorrow}>
        Tomorrow
      </OptionButton>
      <OptionButton disabled={customDateIsMonday} onClick={setMonday}>
        Monday
      </OptionButton>
    </Stack>
  );
}
