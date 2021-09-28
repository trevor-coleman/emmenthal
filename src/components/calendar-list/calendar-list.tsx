import React, { useContext } from 'react';
import { FormGroup } from '@mui/material';
import { CalendarContext } from '../calendar-provider';
import { CalendarListCheckbox } from './components/calendar-list-checkbox';
import { CalendarItem } from './calendar';

import CollapsingSection from '../collapsingSection';

type CalendarListProps = {};

export const CalendarList = ({}: CalendarListProps) => {
  const { calendars, selectedCalendars, toggleSelected } =
    useContext(CalendarContext);

  const persistCalendars = calendars.filter((c) =>
    selectedCalendars.includes(c.id!)
  );

  const SelectedCalendarList = () => {
    return (
      <div>
        {calendars
          .filter((c) => selectedCalendars.includes(c.id!))
          .map((c) => (
            <div key={c.id!}>{c.summary}</div>
          ))}
      </div>
    );
  };

  return (
    <CollapsingSection
      title={'Calendars'}
      closedComponent={<SelectedCalendarList />}
    >
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
    </CollapsingSection>
  );
};
