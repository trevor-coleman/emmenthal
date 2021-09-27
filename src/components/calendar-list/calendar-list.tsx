import React, {
  ChangeEvent,
  EventHandler,
  useContext,
  useReducer,
  useState,
} from 'react';
import { google, calendar_v3 } from 'googleapis';
import calendar from '../../../pages/api/calendars';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { CalendarContext } from '../calendar-provider';
import { CalendarListCheckbox } from './components/calendar-list-checkbox';
import { CalendarItem } from './calendar';

type CalendarListProps = {};

export const CalendarList = ({}: CalendarListProps) => {
  const { calendars, selectedCalendars, toggleSelected } =
    useContext(CalendarContext);

  return (
    <div>
      <div>
        <Typography variant={'h6'}>Calendars</Typography>
      </div>
      <FormGroup>
        {calendars &&
          calendars.map((c: CalendarItem) => {
            return (
              <CalendarListCheckbox
                key={c.id}
                checked={selectedCalendars.includes(c.id!)}
                calendar={c}
                onCheck={(e) => toggleSelected(c.id!)}
              />
            );
          })}
      </FormGroup>
    </div>
  );
};
