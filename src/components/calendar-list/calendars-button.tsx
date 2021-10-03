import { Box, Button, Modal, Paper, Popover } from '@mui/material';
import { CalendarList } from './calendar-list';
import React, { useCallback, useState } from 'react';
import { SettingsButton } from '../settings/settings-button';
import { useCalendarContext, useCalendarOptions } from '../calendar-provider';
import { calendar } from 'googleapis/build/src/apis/calendar';

export function CalendarsButton() {
  const { calendars, selectedCalendars } = useCalendarContext();

  const { length: numberOfCalendars } = selectedCalendars;

  const maxNameLength = 30;

  const label = React.useMemo(() => {
    const calendarNames = selectedCalendars
      .map((id) => calendars.find((c) => c.id! === id)!.summary)
      .map((name) => {
        return name && name?.length > maxNameLength
          ? (name.slice(0, maxNameLength - 3) ?? 'Unnamed Calendar') + '...'
          : name ?? 'Unnamed Calendar';
      });

    if (calendarNames.length > 4 || calendarNames.length === 0) {
      return `${calendarNames.length} calendars`;
    }

    if (calendarNames.length === 1) {
      return `"${calendarNames[0]}"`;
    }

    const result = calendarNames.map((name, index) => {
      if (index === calendarNames.length - 1) {
        return `and  "${name},"`;
      }

      if (index === calendarNames.length - 2) {
        return `"${name}" `;
      }
      return `"${name}", `;
    });

    console.log(result);
    return result.join('');

    // return `${numberOfCalendars} Calendar${numberOfCalendars === 1 ? '' : 's'}`;
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
