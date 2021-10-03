import { FormGroup, Stack, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useCalendarOptions } from '../calendar-provider';
import { OptionButton } from '../settings/options-button';
import { useSettingsButtonOnSelect } from '../settings/settings-button';

export function NumberOfDays() {
  const onSelect = useSettingsButtonOnSelect();
  const { options, setOptions } = useCalendarOptions();

  const {
    date: { range },
  } = options;

  const [value, setValue] = useState(!range || isNaN(range) ? '1' : range);

  const setRange = useCallback(
    (newRange: number) => {
      let nextRange = Math.max(newRange, 1);
      setOptions({
        ...options,
        date: {
          ...options.date,
          range: Math.min(nextRange, 14),
        },
      });
      setValue(!newRange || isNaN(newRange) ? '' : newRange);
    },
    [options]
  );

  const handleOneWeek = useCallback(() => {
    setRange(7);
    onSelect();
  }, [setRange, onSelect]);

  const handleThreeDays = useCallback(() => {
    setRange(3);
    onSelect();
  }, [setRange, onSelect]);

  const handleTwoWeeks = useCallback(() => {
    setRange(14);
    onSelect();
  }, [setRange, onSelect]);

  const handleChange = useCallback(
    (e) => {
      setRange(parseInt(e.target.value));
    },
    [setRange, onSelect]
  );

  return (
    <Stack spacing={1} direction={'column'} width={'100%'}>
      <TextField
        fullWidth
        label={'Days (1-14)'}
        value={value}
        type={'number'}
        error={value > 14}
        onChange={handleChange}
      />
      <OptionButton onClick={handleThreeDays}>3 Days</OptionButton>
      <OptionButton onClick={handleOneWeek}>1 Week</OptionButton>
      <OptionButton onClick={handleTwoWeeks}>2 Weeks</OptionButton>
    </Stack>
  );
}
