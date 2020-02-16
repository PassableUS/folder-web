import { colors } from '@material-ui/core';

const white = '#FFFFFF';

export default {
  primary: {
    // contrastText: white,  CALCULATED
    // dark: colors.indigo[900],  CALCULATED
    main: '#0984e3',
    // light: colors.indigo[100]  CALCULATED
  },
  secondary: {
    // contrastText: white,
    // dark: colors.blue[900],
    main: '#00b894',
    // light: colors.blue.A400
  },
  error: {
    // contrastText: white,
    // dark: colors.red[900],
    main: colors.red[600],
    // light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: '#F4F6F8',
    paper: white
  },
  divider: colors.grey[200],
  contrastThreshold: 3,
  tonalOffset: 0.2
};
