import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: { default: '#FEEAAE' },
    primary: {
      main: '#1D3557',
    },
    secondary: {
      main: '#037971',
    },
    success: {
      main: '#3DDC97',
    },
    error: {
      main: '#FF495C',
    },
    info: {
      main: '#11a1d3',
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
});
export default theme;
