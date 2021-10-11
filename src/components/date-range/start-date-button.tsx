import { SettingsButton } from '../settings/settings-button';
import { StartDate } from './start-date';
import { useCalendarOptions } from '../calendar-provider';
import { useMemo } from 'react';
import {
  differenceInCalendarDays,
  differenceInWeeks,
  format,
  isToday,
  isTomorrow,
  startOfDay,
  startOfToday,
  startOfTomorrow,
} from 'date-fns';

export function StartDateButton() {
  const { options } = useCalendarOptions();

  const {
    date: { customDate },
  } = options;

  const label = useMemo(() => {
    const today = startOfToday();
    const checkDate = startOfDay(customDate ?? startOfTomorrow());
    const dayDistance = differenceInCalendarDays(checkDate, today);
    const weekDistance = differenceInWeeks(checkDate, today);

    if (isToday(checkDate)) return 'Today';
    if (isTomorrow(checkDate)) return 'Tomorrow';
    if (weekDistance < 1) return format(checkDate, 'EEEE');
    return `${format(checkDate, 'eee MMM do')}`;
  }, [customDate]);

  return (
    <SettingsButton id={'start-date-menu'} label={label}>
      <StartDate />
    </SettingsButton>
  );
}
