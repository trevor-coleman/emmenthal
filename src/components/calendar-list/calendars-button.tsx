import { Box, Button, Modal, Paper, Popover } from '@mui/material';
import { CalendarList } from './calendar-list';
import React, { useCallback, useState } from 'react';
import { SettingsButton } from '../settings/settings-button';
import { useCalendarContext, useCalendarOptions } from '../calendar-provider';
import { calendar } from 'googleapis/build/src/apis/calendar';

export function CalendarsButton() {
  const { calendars, selectedCalendars } = useCalendarContext();

  const { length: numberOfCalendars } = selectedCalendars;

  const label = React.useMemo(() => {
    return `${numberOfCalendars} Calendar${numberOfCalendars === 1 ? '' : 's'}`;
  }, [numberOfCalendars]);

  return (
    <SettingsButton
      id={'calendar-list'}
      label={label}
      buttonProps={
        selectedCalendars.length === 0
          ? {
              color: 'error',
            }
          : undefined
      }
    >
      <CalendarList />
    </SettingsButton>
  );
}
