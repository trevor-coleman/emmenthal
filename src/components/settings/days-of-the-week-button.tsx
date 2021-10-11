import { SettingsButton } from './settings-button';
import React, { useMemo } from 'react';
import { daysOfTheWeek, DaysOfTheWeek } from './days-of-the-week';
import { DaysTuple, useCalendarOptions } from '../calendar-provider';
import { OptionButton } from './options-button';

function isWeekdays(days: DaysTuple) {
  if (days[0] || days[6]) return false;
  for (let i = 1; i < 6; i++) {
    if (!days[i]) return false;
  }
  return true;
}

function isWeekend(days: DaysTuple) {
  if (!(days[0] && days[6])) return false;
  for (let i = 1; i <= 5; i++) {
    if (days[i]) return false;
  }
  return true;
}

function everyDay(days: DaysTuple) {
  if (days.some((i) => !i)) return false;
  return true;
}

export function DaysOfTheWeekButton() {
  const {
    options: {
      date: { days },
    },
  } = useCalendarOptions();

  const label = useMemo(() => {
    if (isWeekdays(days)) {
      return 'weekdays';
    }
    if (everyDay(days)) {
      return 'every day';
    }

    const selectedDays: string[] = [];
    const unselectedDays: string[] = [];

    days.forEach((day, index) => {
      if (day) {
        selectedDays.push(daysOfTheWeek[index]);
      } else {
        unselectedDays.push(daysOfTheWeek[index]);
      }
    });

    if (selectedDays.length === 0) return 'no days';

    if (selectedDays.length >= 5) {
      return `every day except ${listify(unselectedDays, '')}`;
    }
    return listify(selectedDays, 'no days');
  }, [days]);

  return (
    <SettingsButton
      id='rays-of-week'
      label={label}
      paperStyle={{
        maxWidth: '22rem',
      }}
    >
      <DaysOfTheWeek />
      <OptionButton>Weekdays</OptionButton>
      <OptionButton>Every Day</OptionButton>
    </SettingsButton>
  );
}

function listify(
  items: string[],
  emptyState: string,
  connector: 'and' | 'or' = 'or'
): string {
  if (items.length === 0) return emptyState;
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${connector} ${items[1]}`;
  if (items.length >= 3)
    return (
      items
        .map((item, index) => {
          if (index === items.length - 1) return `${connector} ${item}`;
          if (index === items.length - 2) return `${item} `;
          return `${item}, `;
        })
        .join('') ?? ''
    );
  return emptyState;
}
