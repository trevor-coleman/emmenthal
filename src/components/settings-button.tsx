import {
  Button,
  ButtonProps,
  Paper,
  Popover,
  PopoverProps,
} from '@mui/material';
import React, { createContext, PropsWithChildren, useContext } from 'react';

interface ISettingsButtonProps {
  id: string;
  label: string;
  buttonProps?: ButtonProps;
  popOverProps?: Omit<PopoverProps, 'open'>;
}

export const SettingsButtonContext = createContext<
  { onSelect: () => void } | undefined
>(undefined);

type SettingsButtonProps = PropsWithChildren<ISettingsButtonProps>;
export function SettingsButton({
  id,
  label,
  children,
  buttonProps,
  popOverProps,
}: SettingsButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? id : undefined;

  return (
    <>
      <Button
        variant={'outlined'}
        color={'secondary'}
        onClick={handleClick}
        {...buttonProps}
      >
        {label}
      </Button>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        {...popOverProps}
      >
        <SettingsButtonContext.Provider
          value={{
            onSelect: handleClose,
          }}
        >
          <Paper
            sx={{
              p: 2,
            }}
          >
            {children}
          </Paper>
        </SettingsButtonContext.Provider>
      </Popover>
    </>
  );
}

export const useSettingsButtonOnSelect = () => {
  const context = useContext(SettingsButtonContext);
  if (typeof context === 'undefined') {
    throw new Error(
      'useSettingsButtonOnSelect must be used inside of a SettingsButton'
    );
  }
  const { onSelect } = context;
  return onSelect;
};