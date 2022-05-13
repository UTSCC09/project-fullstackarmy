import React from 'react';

export const ColorModeContext = React.createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});
