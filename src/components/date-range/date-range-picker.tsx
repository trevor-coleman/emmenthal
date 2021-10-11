import { Slider } from '@mui/material';
import { useState } from 'react';
import {
  endOfDay,
  format,
  fromUnixTime,
  getUnixTime,
  roundToNearestMinutes,
  setHours,
  startOfDay,
} from 'date-fns';

function valuetext(value: number) {
  return `---${value}---`;
}

const start = startOfDay(new Date());
const end = endOfDay(new Date());

const min = getUnixTime(start);
const max = getUnixTime(end);

const marks: { value: number; label: string }[] = [];

const numberOfMarks = 4;
const step = (max - min) / (24 * 4);

for (let i = 0; i <= numberOfMarks; i++) {
  const nextStep = (max - min) / numberOfMarks;
  const value = min + i * nextStep;

  const roundedValue = roundToNearestMinutes(fromUnixTime(value), {
    nearestTo: 15,
  });
  marks.push({
    value: getUnixTime(roundedValue),
    label: format(roundedValue, 'h:mma'),
  });
}

export function DateRangePicker() {
  const [value, setValue] = useState<number[]>([
    getUnixTime(setHours(start, 9)),
    getUnixTime(setHours(start, 17)),
  ]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Slider
      getAriaLabel={() => 'Time Range'}
      value={value}
      onChange={handleChange}
      components={{}}
      valueLabelDisplay='auto'
      getAriaValueText={valuetext}
      min={min}
      max={max}
      marks={marks}
      step={step}
      valueLabelFormat={(a: number, i) => {
        const x = format(
          roundToNearestMinutes(fromUnixTime(a), { nearestTo: 15 }),
          'hh:mma'
        );
        return <div>{x}</div>;
      }}
    />
  );
}
