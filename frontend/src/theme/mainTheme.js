import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#42a5f5',
        // contrastText: '#ffcc00',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#f5f5f5',
        // contrastText: '#ffcc00',
      },
    },
    // contrastThreshold: 4.5,
  });

  export default theme;