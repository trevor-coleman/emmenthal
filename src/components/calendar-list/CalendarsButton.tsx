import { Box, Button, Modal, Paper, Popover } from '@mui/material';
import { CalendarList } from './calendar-list';
import React, { useCallback, useState } from 'react';

export function CalendarsButton() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'calendars-popover' : undefined;

  return (
    <>
      <Button variant={'outlined'} onClick={handleClick}>
        3 Calendars{' '}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Paper
          sx={{
            p: 2,
          }}
        >
          <CalendarList />
        </Paper>
      </Popover>
    </>
  );
}
