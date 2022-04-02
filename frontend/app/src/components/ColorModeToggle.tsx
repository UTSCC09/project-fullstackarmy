import React from 'react';
import Switch from '@mui/material/Switch';
import { ColorModeContext } from "./context/ColorModeContext";

export const ColorModeToggle = () => {
    const {darkMode, toggleDarkMode} = React.useContext(ColorModeContext);

    return (
        <Switch 
         checked = {darkMode}
         onChange = {toggleDarkMode}
         color = "secondary"
        />
    );
}