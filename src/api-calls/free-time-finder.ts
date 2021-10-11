import {
  FreeBusyData,
  ICalendarOptions,
} from '../components/calendar-provider';
import {
  isBefore,
  isEqual,
  Interval,
  getHours,
  getDay,
  endOfDay,
  startOfDay,
  set,
  getMinutes,
  max,
  add,
} from 'date-fns';

export function findFreeTime(
  freeBusyData: FreeBusyData,
  selectedCalendars: string[],
  { time: timeOptions, date: { days: weekdays } }: ICalendarOptions
): Interval[] {
  const range: Interval = {
    start: timeOptions?.start ?? set(new Date(), { hours: 10, minutes: 0 }),
    end: timeOptions?.end ?? set(new Date(), { hours: 10, minutes: 0 }),
  };

  const { duration } = timeOptions;

  const queue: Interval[] = [];

  Object.keys(freeBusyData).forEach((i) =>
    freeBusyData[i].times.forEach((time) =>
      queue.push({ start: new Date(time.start!), end: new Date(time.end!) })
    )
  );

  queue.sort((a, b) => {
    if (isEqual(b.start, a.start)) {
      if (isEqual(a.end, b.end)) return 0;
      return isBefore(a.end, b.end) ? -1 : 1;
    }
    return isBefore(a.start, b.end) ? -1 : 1;
  });

  let busy = queue.shift()!;
  if (!busy) return [];

  function setTime(timeA: Date | number, timeB: Date | number) {
    return set(timeA, {
      hours: getHours(new Date(timeB)),
      minutes: getMinutes(new Date(timeB)),
    });
  }

  function getDayRange(interval: Interval) {
    return {
      start: setTime(interval.end, range.start),
      end: setTime(interval.end, range.end),
    };
  }

  let day = getDayRange(busy);

  let free: Interval = { start: day.start, end: day.start };

  const freeTimes: Interval[] = [];

  while (busy) {
    let { start, end } = busy;

    //If event crosses midnight split (at midnight) into two events
    if (getDay(start) !== getDay(end)) {
      queue.unshift({ start: startOfDay(end), end });
      end = endOfDay(start);
    }

    //If next event is on a different day, reset day
    if (getDay(free.end) !== getDay(start)) {
      day = getDayRange(busy);
      free.start = setTime(start, range.start);
      free.end = free.start;
    }

    if (!weekdays[getDay(start)]) {
      busy = queue.shift()!;
      continue;
    }

    if (start <= max([free.end, add(free.start, duration)])) {
      if (end <= free.end) {
        busy = queue.shift()!;
        continue;
      }
      free.end = end;
      busy = queue.shift()!;
      continue;
    }

    freeTimes.push({
      start: free.end,
      end: start,
    });
    free.end = end;

    busy = queue.shift()!;
  }

  return freeTimes;
}
