import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import React from 'react';
import { ColorModeContext } from './context/ColorModeProvider';

export const ColorModeToggle = () => {
  const { darkMode, toggleDarkMode } = React.useContext(ColorModeContext);

  return (
    <IconButton size='large' color='inherit' onClick={toggleDarkMode}>
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
