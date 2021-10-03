import { Button, ButtonProps } from '@mui/material';
import React from 'react';

export function OptionButton({ children, ...props }: ButtonProps) {
  return (
    <Button variant={'outlined'} color={'secondary'} fullWidth {...props}>
      {children}
    </Button>
  );
}
