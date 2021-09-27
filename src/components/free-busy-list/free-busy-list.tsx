import React from 'react';
import { Box, Button, List, Typography } from '@mui/material';
import { useCalendarContext } from '../calendar-provider';
import { TimePeriodListItem } from '../time-period-list-item';
import { findFreeTime } from '../../api-calls/free-time-finder';
import { formatRFC3339, getDay } from 'date-fns';
import { DayDivider } from './components/day-divider';
import CopyToClipboard from 'react-copy-to-clipboard';
import { formatFreeTimeText } from './format-free-time-text';

let lastDay: Date | number | undefined;
function shouldShowDivider(interval: Interval, index: number) {
  const day = getDay(interval.start);
  if (day === lastDay && index > 0) {
    return false;
  }

  lastDay = day;
  return true;
}

export const FreeBusyList = () => {
  const { freeBusyData, selectedCalendars, options } = useCalendarContext();

  const freeTime = findFreeTime(freeBusyData, selectedCalendars, options);
  const freeTimeText = formatFreeTimeText(freeTime);
  //TODO: Make find free time work with ranges
  /**
   * Will need to make it all work with dates so that you can use DateFns to if the times are in the range, despite the day.
   */

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant={'h6'}>Free Times</Typography>
      <CopyToClipboard text={freeTimeText}>
        <Button
          disabled={freeTime.length === 0}
          variant={'contained'}
          color={'secondary'}
        >
          Copy as Plain Text
        </Button>
      </CopyToClipboard>
      <List>
        {freeTime.map((interval, index) => {
          return (
            <div key={formatRFC3339(interval.start)}>
              {shouldShowDivider(interval, index) && (
                <DayDivider interval={interval} />
              )}
              <TimePeriodListItem
                key={formatRFC3339(interval?.start ?? new Date())}
                timePeriod={interval}
              />
            </div>
          );
        })}
      </List>
    </Box>
  );
};
