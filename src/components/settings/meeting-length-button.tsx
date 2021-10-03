import { MeetingLength } from './meeting-length';
import { SettingsButton } from './settings-button';
import React, { useMemo } from 'react';
import { useCalendarOptions } from '../calendar-provider';
import { formatDuration } from 'date-fns';

export function MeetingLengthButton() {
  const { options } = useCalendarOptions();
  const {
    time: { duration },
  } = options;

  const label = useMemo(() => {
    const { hours, minutes } = duration;

    return formatDuration(duration);

    return '1 hour';
  }, [duration]);

  return (
    <SettingsButton id='meeting-length' label={label}>
      <MeetingLength />
    </SettingsButton>
  );
}
