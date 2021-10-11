import { Box, Button, IconButton, Typography } from '@mui/material';
import { CalendarsButton } from '../calendar-list/calendars-button';
import { StartDateButton } from '../date-range/start-date-button';
import { DaysOfTheWeekButton } from './days-of-the-week-button';
import { NumberOfDaysButton } from '../date-range/number-of-days-button';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { SettingsButton } from './settings-button';
import { MeetingLengthButton } from './meeting-length-button';
import { Done, Edit, Google } from '@mui/icons-material';
import theme from '../../theme';
import { useAuth } from '../auth-provider';

function NoWrap({ children }: PropsWithChildren<{}>) {
  return (
    <Box component={'span'} sx={{ whiteSpace: 'nowrap' }}>
      {children}
    </Box>
  );
}

const ButtonBarContext = createContext<boolean | undefined>(undefined);

export function ButtonBar() {
  const { authenticated, signIn } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <ButtonBarContext.Provider value={isExpanded}>
      <Box
        sx={{
          borderRadius: '1rem',
          borderWidth: 5,
          borderStyle: 'solid',
          borderColor: 'palette.secondary',
          display: 'flex',
          p: 2,
          marginBottom: 2,
          boxShadow:
            'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        }}
      >
        {authenticated ? (
          <>
            <Box mr={2}>
              <IconButton
                onClick={toggleExpanded}
                color={isExpanded ? 'info' : 'info'}
              >
                {isExpanded ? <Done /> : <Edit />}
              </IconButton>
            </Box>
            <Box flexGrow={1}>
              <Typography
                sx={{
                  fontSize: isExpanded ? '1.5rem' : '1.25rem',
                  transition: theme.transitions.create(['font-size'], {
                    duration: theme.transitions.duration.standard,
                  }),
                }}
              >
                Find <MeetingLengthButton /> of free time in{' '}
                {isExpanded ? <br /> : ''}
                <CalendarsButton /> {isExpanded ? <br /> : ''} for{' '}
                <NoWrap>
                  <NumberOfDaysButton />
                </NoWrap>{' '}
                {isExpanded ? <br /> : ''}
                starting{' '}
                <NoWrap>
                  <StartDateButton />,
                </NoWrap>{' '}
                {isExpanded ? <br /> : ''}
                on <DaysOfTheWeekButton />, {isExpanded ? (
                  <br />
                ) : (
                  ''
                )}between{' '}
                <SettingsButton id='time-range' label={'10:00am and 6:00pm'}>
                  <div />
                </SettingsButton>
                .
              </Typography>
            </Box>
          </>
        ) : (
          <div>
            <Typography
              sx={{
                fontSize: isExpanded ? '1.5rem' : '1.25rem',
                transition: theme.transitions.create(['font-size'], {
                  duration: theme.transitions.duration.standard,
                }),
              }}
            >
              <Button
                startIcon={<Google />}
                variant={'contained'}
                onClick={signIn}
              >
                Sign In With Google
              </Button>{' '}
              to get started{' '}
            </Typography>
          </div>
        )}
      </Box>
    </ButtonBarContext.Provider>
  );
}

export const useButtonBarState = () => {
  const context = useContext(ButtonBarContext);
  if (typeof context === 'undefined') {
    throw new Error('useButtonBarState must be used inside a buttonbar');
  }
  return context;
};

const SettingsButtonLabel = ({ children }: { children: string }) => (
  <Typography
    sx={{
      fontSize: 'caption.fontSize',
    }}
    color={'gray'}
  >
    {children}
  </Typography>
);
