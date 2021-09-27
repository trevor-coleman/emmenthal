import { format, getDay } from 'date-fns';

export function formatFreeTimeText(freeTime: Interval[]) {
  const lines: string[] = [];

  let lastDay: Date | number | undefined;

  freeTime.forEach(({ start, end }, index) => {
    if (getDay(start) !== lastDay) {
      lastDay = getDay(start);
      if (index > 0) {
        lines.push('');
      }
      lines.push(format(start, 'EEE LLL do'));
    }
    lines.push(`• ${format(start, 'h:mmaaaaa')} - ${format(end, 'h:mmaaaaa')}`);
  });

  return lines.join('\n');
}
