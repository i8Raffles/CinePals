import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: 'rgb(25, 118, 210)',
        contrastText: 'rgb(255, 255, 255)',
      },
      secondary: {
        // This is green.A700 as hex.
        main: 'rgba(0, 0, 0, 0.08)',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
    },
    // contrastThreshold: 4.5,
  });

  export default theme;
