import { NumberOfDays } from './number-of-days';
import { SettingsButton } from '../settings-button';
import { useCalendarOptions } from '../calendar-provider';
import { useMemo } from 'react';

export function NumberOfDaysButton() {
  const {
    options: {
      date: { range },
    },
  } = useCalendarOptions();

  const label = useMemo(() => {
    const days = isNaN(range ?? 1) ? 1 : range ?? 1;
    const weeks = days / 7;
    return (days > 1 && days % 7) === 0
      ? `${weeks} week${weeks === 1 ? '' : 's'}`
      : `${days} day${days === 1 ? '' : 's'}`;
  }, [range]);

  return (
    <SettingsButton id={'number-of-days'} label={label}>
      <NumberOfDays />
    </SettingsButton>
  );
}
