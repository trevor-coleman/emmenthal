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
import { addDays, set, startOfTomorrow } from 'date-fns';
import { useAuth } from './auth-provider';

type Calendar = calendar_v3.Schema$CalendarListEntry;
type Calendars = Calendar[];
type FreeBusyTimes = { times: calendar_v3.Schema$TimePeriod[] };
export type FreeBusyData = Record<string, FreeBusyTimes>;

interface ICalendarProviderProps {}

type CalendarProviderProps = PropsWithChildren<ICalendarProviderProps>;

export type DaysTuple = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];

export interface ICalendarOptions {
  date: {
    customDate?: Date | number | null;
    range: number | null;
    days: DaysTuple;
  };
  time: {
    start: Date | number | null;
    end: Date | number | null;
    duration: Duration;
  };
}

interface ICalendarContextData {
  options: ICalendarOptions;
  calendars: Calendars;
  freeBusyData: FreeBusyData;
  selectedCalendars: string[];
  isChecked: Record<string, boolean>;
  toggleSelected: (id: string) => void;
  primaryCalendar: Calendar | null;
}

const blankContext: ICalendarContextData = {
  options: {
    date: {
      customDate: undefined,
      range: 7,
      days: [false, true, true, true, true, true, false],
    },
    time: {
      start: set(new Date(), { hours: 10, minutes: 0 }),
      end: set(new Date(), { hours: 18, minutes: 0 }),
      duration: { hours: 1, minutes: 0 },
    },
  },
  calendars: [],
  primaryCalendar: null,
  selectedCalendars: [],
  freeBusyData: {},
  isChecked: {},
  toggleSelected: (id: string) => {},
};

function init(): ICalendarContextData {
  console.log('initializing Calendar Context');
  // return blankContext;
  if (typeof window === 'undefined') {
    console.log('no window returning blankContext');
    return blankContext;
  }

  const storedContext = localStorage.getItem('contextValue');

  const initialContext = storedContext ? JSON.parse(storedContext) : {};

  const { date = {}, time = {} } = initialContext.options ?? {};

  return {
    ...blankContext,
    //   ...initialContext,
    //   options: {
    //     ...initialContext.options,
    //     date: date
    //       ? {
    //           ...date,
    //           customDate: startOfDay(date.customDate)
    //             ? startOfDay(new Date(date.customDate))
    //             : null,
    //         }
    //       : {
    //           date: {
    //             ...blankContext.options.date,
    //           },
    //         },
    //     time: time
    //       ? {
    //           start: new Date(time.start),
    //           end: new Date(time.end),
    //         }
    //       : {
    //           ...blankContext.options.time,
    //         },
    //   },
    // };
  };
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
  const { authenticated } = useAuth();
  const [calendarList, setCalendarList] = useState<Calendars>(init().calendars);
  const [primaryCalendar, setPrimaryCalendar] = useState<Calendar | null>(null);
  const [isChecked, setIsChecked] = useState<Record<string, boolean>>(
    init().isChecked
  );
  const [freeBusyData, setFreeBusyData] = useState<FreeBusyData>({});
  const [options, setOptions] = useState(init().options);

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

  useEffect(() => {
    console.log('getCalendars thinks: ', authenticated);
    if (!authenticated) return;
    void getCalendars(setCalendarList, setPrimaryCalendar);
  }, [setCalendarList, getCalendars, authenticated]);

  useEffect(() => {
    if (!authenticated) return;
    if (!options.date.range || options.date.range === 0) return;
    const calendars = calendarList.filter((c) => isChecked[c.id!]);
    const { customDate, range } = options.date;
    const interval: Interval = {
      start: customDate ?? startOfTomorrow(),
      end: addDays(customDate ?? new Date(), range ?? 7),
    };

    void getFreeBusy(calendars, interval, setFreeBusyData);
  }, [isChecked, options, calendarList, authenticated]);

  const selectedCalendars = Object.keys(isChecked).filter((k) => isChecked[k]);

  const contextValue: ICalendarContext = {
    options,
    setOptions,
    freeBusyData,
    isChecked,
    primaryCalendar,
    calendars: calendarList,
    selectedCalendars,
    toggleSelected: toggleCheck,
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem('contextValue', JSON.stringify(contextValue));
  }

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

type SetCalendarStateFunction = (list: Calendars) => void;
type SetPrimaryStateFunction = (primary: Calendar | null) => void;

async function getCalendars(
  setCalendarList: SetCalendarStateFunction,
  setPrimaryCalendar: SetPrimaryStateFunction
) {
  try {
    const res = await axios.get('/api/calendars', {
      withCredentials: true,
    });

    const { calendars, primary } = res.data;

    const calendarList = calendars;

    setPrimaryCalendar(primary);
    setCalendarList(calendarList);
  } catch (e) {
    setPrimaryCalendar(null);
    setCalendarList([]);
  }
}

async function getFreeBusy(
  calendars: Calendars,
  interval: Interval,
  handleResult: (result: FreeBusyData) => void
) {
  console.log('getting FreeBusy');

  let res: AxiosResponse<FreeBusyResponse> | undefined;

  try {
    res = await axios.post<Calendars, AxiosResponse<FreeBusyResponse>>(
      'api/free-busy',
      {
        calendars,
        interval,
      }
    );
  } catch (error) {}

  if (!res) {
    handleResult({});
    return;
  }

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
