import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios, { AxiosResponse } from 'axios';
import { calendar_v3 } from 'googleapis';
import { FreeBusyResponse } from '../api-calls/free-busy';
import { addDays, set, startOfDay, startOfTomorrow } from 'date-fns';

type Calendar = calendar_v3.Schema$CalendarListEntry;
type Calendars = Calendar[];
type FreeBusyTimes = { times: calendar_v3.Schema$TimePeriod[] };
export type FreeBusyData = Record<string, FreeBusyTimes>;

interface ICalendarProviderProps {}

type CalendarProviderProps = PropsWithChildren<ICalendarProviderProps>;

interface ICalendarOptions {
  date: {
    customDate?: Date | number | null;
    range: number | null;
    days: number[];
  };
  time: {
    start: Date | number | null;
    end: Date | number | null;
  };
}

interface ICalendarContextData {
  options: ICalendarOptions;
  calendars: Calendars;
  freeBusyData: FreeBusyData;
  selectedCalendars: string[];
  isChecked: Record<string, boolean>;
  toggleSelected: (id: string) => void;
}

const blankContext: ICalendarContextData = {
  options: {
    date: {
      customDate: undefined,
      range: 7,
      days: [1, 2, 3, 4, 5],
    },
    time: {
      start: set(new Date(), { hours: 10, minutes: 0 }),
      end: set(new Date(), { hours: 18, minutes: 0 }),
    },
  },
  calendars: [],
  selectedCalendars: [],
  freeBusyData: {},
  isChecked: {},
  toggleSelected: (id: string) => {},
};

function init(): ICalendarContextData {
  return blankContext;
  // if (typeof window === 'undefined') return blankContext;
  //
  // const storedContext = localStorage.getItem('contextValue');
  //
  // const initialContext = storedContext ? JSON.parse(storedContext) : {};
  //
  // const {date = {}, time = {}} = initialContext.options ?? {};
  //
  // return {
  //   ...blankContext,
  //   ...initialContext,
  //   options: {
  //     ...initialContext.options,
  //     date: date
  //       ? {
  //         ...date,
  //         customDate: startOfDay(date.customDate)
  //           ? startOfDay(new Date(date.customDate))
  //           : null,
  //       }
  //       : {
  //         date: {
  //           ...blankContext.options.date,
  //         },
  //       },
  //     time: time
  //       ? {
  //         start: new Date(time.start),
  //         end: new Date(time.end),
  //       }
  //       : {
  //         ...blankContext.options.time,
  //       },
  //   },
  // };
}

interface ICalendarContext extends ICalendarContextData {
  setOptions: (options: ICalendarOptions) => void;
}

export const CalendarContext = createContext<ICalendarContext>({
  ...init(),
  setOptions() {
    throw new Error('set options has not been defined');
  },
});

// const getInitialIsChecked = () => {
//   if (typeof window !== 'undefined') {
//     return JSON.parse(localStorage.getItem('isChecked') ?? '{}');
//   } else return {};
// };

// const clearLocalStorage = () => {
//   if (typeof window !== 'undefined') return;
//
//   localStorage.removeItem('isChecked');
// };

export const CalendarProvider: FunctionComponent<CalendarProviderProps> = ({
  children,
}: CalendarProviderProps) => {
  const [calendarList, setCalendarList] = useState<Calendars>(init().calendars);
  const [isChecked, setIsChecked] = useState<Record<string, boolean>>(
    init().isChecked
  );
  const [freeBusyData, setFreeBusyData] = useState<FreeBusyData>({});

  function toggleCheck(id: string) {
    const newIsChecked = {
      ...isChecked,
      [id]: !isChecked[id],
    };
    setIsChecked(newIsChecked);
    if (typeof window !== 'undefined') {
      localStorage.setItem('isChecked', JSON.stringify(newIsChecked));
    }
  }

  const [options, setOptions] = useState(init().options);

  useEffect(() => {
    void getCalendars(setCalendarList);
  }, []);

  useEffect(() => {
    const calendars = calendarList.filter((c) => isChecked[c.id!]);
    const { customDate, range } = options.date;
    const interval: Interval = {
      start: customDate ?? startOfTomorrow(),
      end: addDays(customDate ?? new Date(), range ?? 7),
    };

    void getFreeBusy(calendars, interval, setFreeBusyData);
  }, [isChecked, options, calendarList]);

  const selectedCalendars = Object.keys(isChecked).filter((k) => isChecked[k]);

  const contextValue: ICalendarContext = {
    options,
    setOptions,
    freeBusyData,
    isChecked,
    calendars: calendarList,
    selectedCalendars,
    toggleSelected: toggleCheck,
  };

  console.log(contextValue);

  if (typeof window !== 'undefined') {
    localStorage.setItem('contextValue', JSON.stringify(contextValue));
  }

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

async function getCalendars(setCalendarList: (list: Calendars) => void) {
  try {
    const res = await axios.get('/api/calendars', {
      withCredentials: true,
    });

    const calendarList = res.data;

    setCalendarList(calendarList);
  } catch (e) {
    setCalendarList([]);
  }
}

async function getFreeBusy(
  calendars: Calendars,
  interval: Interval,
  handleResult: (result: FreeBusyData) => void
) {
  console.log('getting FreeBusy');
  const res = await axios.post<Calendars, AxiosResponse<FreeBusyResponse>>(
    'api/free-busy',
    {
      calendars,
      interval,
    }
  );

  const result: FreeBusyData = {};

  res.data.map(({ id, times = [] }) => {
    result[id] = { times };
  });

  handleResult(result);
}

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error(
      'useCalendar context must be used with in a CalendarProvider'
    );

  return context;
}

export function useCalendarOptions() {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error(
      'useCalendar context must be used with in a CalendarProvider'
    );

  const { options, setOptions } = context;

  return { options, setOptions };
}
