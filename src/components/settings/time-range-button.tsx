import { TimeRange } from './time-range';
import { SettingsButton } from './settings-button';
import React, { useMemo } from 'react';
import { useCalendarOptions } from '../calendar-provider';
import { format, formatDuration } from 'date-fns';

export function TimeRangeButton() {
  const { options } = useCalendarOptions();
  const {
    time: { start, end },
  } = options;

  const label = useMemo(
    () => `${format(start ?? 0, 'h:mmb')} and ${format(end ?? 0, 'h:mmb')}`,
    [start, end]
  );
  return (
    <SettingsButton id='timeRange' label={label} buttonProps={{}}>
      <TimeRange />
    </SettingsButton>
  );
}
