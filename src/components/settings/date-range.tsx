import { DatePicker } from '@mui/lab';
import { isTomorrow, startOfTomorrow } from 'date-fns';
import {
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
} from '@mui/material';
import React from 'react';
import { useCalendarOptions } from '../calendar-provider';

export function DateRange() {
  const { options, setOptions } = useCalendarOptions();

  const { date } = options;

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Time Window</FormLabel>
      <FormGroup>
        <Stack spacing={1} direction={'row'}>
          <Box width={'50%'}>
            <DatePicker
              label='Start Date'
              value={date.customDate ?? startOfTomorrow()}
              onChange={(newValue: Date | null) => {
                setOptions({
                  ...options,
                  date: {
                    ...options.date,
                    customDate:
                      newValue === null || isTomorrow(newValue)
                        ? null
                        : newValue,
                  },
                });
              }}
              renderInput={({ value, ...params }: any) => (
                <TextField {...params} />
              )}
            />
          </Box>
          <Box>
            <TextField
              sx={{ width: '50%' }}
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
          </Box>
        </Stack>
      </FormGroup>
    </FormControl>
  );
}
