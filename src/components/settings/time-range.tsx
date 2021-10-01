import { TimePicker } from '@mui/lab';
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

export function TimeRange() {
  const { options, setOptions } = useCalendarOptions();

  const { time } = options;

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Time Window</FormLabel>
      <FormGroup>
        <Stack spacing={1} direction={'row'}>
          <Box width={'50%'}>
            <TimePicker
              label='From'
              value={time.start}
              minutesStep={5}
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
          </Box>
          <Box width={'50%'}>
            <TimePicker
              label='To'
              value={time.end}
              minutesStep={5}
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
          </Box>
        </Stack>
      </FormGroup>
    </FormControl>
  );
}
