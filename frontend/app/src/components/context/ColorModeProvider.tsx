import { createTheme, ThemeProvider } from '@mui/material';
import React, { ReactNode } from 'react';

export const ColorModeContext = React.createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

interface Props {
  children: ReactNode;
}

const ColorModeProvider: React.FC<Props> = ({ children }) => {
  // Set theme attributes based on darkMode state
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = React.useMemo(
    () => () => {
      setDarkMode((prevDarkMode) => (prevDarkMode ? false : true));
    },
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                color: '#00acea',
              },
            },
          },
          MuiTabs: {
            styleOverrides: {
              root: {
                backgroundColor: darkMode ? '#303030' : 'white',
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: {
                color: darkMode ? 'white' : 'black',
              },
            },
          },
        },
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#ffffff',
          },
          secondary: {
            main: '#00acea',
          },
        },
        typography: {
          button: {
            textTransform: 'none',
          },
        },
      }),
    [darkMode]
  );

  return (
    <ColorModeContext.Provider
      value={React.useMemo(
        () => ({ darkMode, toggleDarkMode }),
        [darkMode, toggleDarkMode]
      )}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
