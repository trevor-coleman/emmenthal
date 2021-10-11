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
  const { hours, minutes } = duration;
  const label = useMemo(() => {
    const result = formatDuration(duration);

    return result ? result : '0 minutes';
  }, [duration]);

  return (
    <SettingsButton
      id='meeting-length'
      label={label}
      buttonProps={
        hours === 0 && minutes === 0
          ? {
              color: 'error',
            }
          : undefined
      }
    >
      <MeetingLength />
    </SettingsButton>
  );
}
