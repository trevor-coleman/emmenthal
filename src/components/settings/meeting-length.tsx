import {
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback } from 'react';
import * as React from 'react';
import { Box } from '@mui/system';
import { useCalendarOptions } from '../calendar-provider';

export function MeetingLength() {
  const { options, setOptions } = useCalendarOptions();

  const { time } = options;
  const { duration } = time;

  function setDuration(duration: Duration): void {
    setOptions({
      ...options,
      time: {
        ...options.time,
        duration,
      },
    });
  }

  const handleHours = useCallback(
    (e: SelectChangeEvent<number>) => {
      setDuration({
        ...duration,
        hours:
          typeof e.target.value === 'number'
            ? e.target.value
            : parseInt(e.target.value),
      });
    },
    [setDuration, duration]
  );

  const { minutes, hours } = duration;

  const handleMinutes = useCallback(
    (e: SelectChangeEvent<number>) => {
      setDuration({
        ...duration,
        minutes:
          typeof e.target.value === 'number'
            ? e.target.value
            : parseInt(e.target.value),
      });
    },
    [setDuration, duration]
  );

  const isError = minutes === 0 && hours === 0;

  return (
    <FormGroup>
      <Stack direction={'row'} spacing={1}>
        <Box width={'50%'}>
          <FormControl fullWidth>
            <InputLabel id='hours-label'>Hours</InputLabel>
            <Select
              labelId='hours-label'
              id='hours'
              error={isError}
              value={hours}
              label='Hours'
              onChange={handleHours}
            >
              {Array.from(new Array(12))
                .map((x, i) => i)
                .map((x) => (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <Box width={'50%'}>
          <FormControl fullWidth>
            <InputLabel id='minutes-label'>Minutes</InputLabel>
            <Select
              labelId='minutes-label'
              error={isError}
              id='minutes'
              value={minutes}
              label='Minutes'
              onChange={handleMinutes}
            >
              {Array.from(new Array(12))
                .map((x, i) => i * 5)
                .map((x) => (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
      {isError && (
        <Typography
          paragraph={false}
          color={'error'}
          sx={{
            fontSize: 'caption.fontSize',
            textAlign: 'center',
            width: '100%',
            paddingTop: 1,
          }}
        >
          Meeting length must be at least 5 minutes
        </Typography>
      )}
    </FormGroup>
  );
}
