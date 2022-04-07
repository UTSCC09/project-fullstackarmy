// Adapted from:
// https://codesandbox.io/s/k1wuo0?file=/demo.tsx
// https://codesandbox.io/s/persistentdrawerright-material-demo-forked-756g4v?file=/demo.tsx:2050-2054
import AccountCircle from '@mui/icons-material/AccountCircle';
import FilterAlt from '@mui/icons-material/FilterAlt';
import Translate from '@mui/icons-material/Translate';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import ConfigBar from './ConfigBar';
import Logo from './Logo';
import TranslationDropdown from './TranslationDropdown';
import Button from '@mui/material/Button';

export const Header = () => {
  // State for handling configuration bar drawer
  const [configBarOpen, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!configBarOpen);
  };

  // State for handling translation dropdown
  // Adapted from: https://codesandbox.io/s/j01dyc?file=/demo.tsx:2589-2600
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleTranslationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative'>
        <Toolbar>
          <Logo />
          <Typography component='div' sx={{ flexGrow: 1 }}></Typography>
          {/* to be used for sign-in/sign-up */}
          <Button color='inherit'>Sign In</Button>
          <Button color='secondary'>Sign Up</Button>

          <IconButton
            size='large'
            color='inherit'
            onClick={handleTranslationMenu}
          >
            <Translate />
          </IconButton>
          <IconButton size='large' color='inherit'>
            <AccountCircle />
          </IconButton>
          <IconButton size='large' color='inherit' onClick={toggleDrawer}>
            <FilterAlt />
          </IconButton>
        </Toolbar>
      </AppBar>
      <TranslationDropdown anchorEl={anchorEl} handleClose={handleClose} />
      <ConfigBar open={configBarOpen} handleClose={toggleDrawer} />
    </Box>
  );
};
