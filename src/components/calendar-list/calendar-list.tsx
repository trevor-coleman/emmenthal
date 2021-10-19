import React, { useContext } from 'react';
import { Divider, FormGroup } from '@mui/material';
import { CalendarContext } from '../calendar-provider';
import { CalendarListCheckbox } from './components/calendar-list-checkbox';
import { CalendarItem } from './calendar';

type CalendarListProps = {};

export const CalendarList = ({}: CalendarListProps) => {
  const { calendars, selectedCalendars, toggleSelected, primaryCalendar } =
    useContext(CalendarContext);

  const persistCalendars = calendars.filter((c) =>
    selectedCalendars.includes(c.id!)
  );

  const SelectedCalendarList = () => {
    return (
      <div>
        {primaryCalendar && <div>{primaryCalendar.summary}</div>}
        {calendars
          .filter((c) => selectedCalendars.includes(c.id!))
          .map((c) => (
            <div key={c.id!}>{c.summary}</div>
          ))}
      </div>
    );
  };

  return (
    <FormGroup>
      {primaryCalendar && (
        <CalendarListCheckbox
          key={primaryCalendar.id}
          isPrimary
          checked={selectedCalendars.includes(primaryCalendar.id!)}
          calendar={primaryCalendar}
          onCheck={(e) => toggleSelected(primaryCalendar.id!)}
        />
      )}
      {calendars &&
        calendars.map((c: CalendarItem) => {
          if (c.id === primaryCalendar?.id) return undefined;
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
  );
};
