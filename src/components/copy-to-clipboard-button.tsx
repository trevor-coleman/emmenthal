import { Button } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';
import React from 'react';

export function CopyToClipBoardButton(
  freeTime: Interval[],
  freeTimeText: string
) {
  return (
    <CopyToClipboard text={freeTimeText}>
      <Button disabled={freeTime.length === 0} variant={'outlined'}>
        Copy as Plain Text
      </Button>
    </CopyToClipboard>
  );
}
