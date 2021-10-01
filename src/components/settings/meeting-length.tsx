import {
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import { Box } from '@mui/system';

export function MeetingLength() {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);

  const handleHours = (e: SelectChangeEvent<number>) => {
    setHours(
      typeof e.target.value === 'number'
        ? e.target.value
        : parseInt(e.target.value)
    );
  };

  const handleMinutes = (e: SelectChangeEvent<number>) => {
    setMinutes(
      typeof e.target.value === 'number'
        ? e.target.value
        : parseInt(e.target.value)
    );
  };

  const isError = minutes === 0 && hours === 0;

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Meeting Length</FormLabel>

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
      </FormGroup>
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
    </FormControl>
  );
}
