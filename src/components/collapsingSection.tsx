import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useState,
} from 'react';
import { Collapse, IconButton, Stack, Typography, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface ICollapsingSectionProps {
  title: string;
  closedComponent: ReactElement;
}

type CollapsingSectionProps = ICollapsingSectionProps;

const CollapsingSection: FunctionComponent<ICollapsingSectionProps> = (
  props: PropsWithChildren<ICollapsingSectionProps>
) => {
  const { title, children, closedComponent } = props;
  const [open, setOpen] = useState(true);
  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        sx={{ background: 'palegoldenrod', width: '100%', px: 1 }}
      >
        <Typography variant={'h6'} sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Stack>
      <Collapse
        in={open}
        sx={{
          px: 2,
          borderLeft: '2px solid palegoldenrod',
          borderRight: '2px solid palegoldenrod',
        }}
      >
        {children}
      </Collapse>
      <Box sx={{ px: 2, border: '2px solid palegoldenrod', borderTop: 0 }}>
        <Collapse in={!open && Boolean(closedComponent)}>
          <Box>{closedComponent}</Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default CollapsingSection;
