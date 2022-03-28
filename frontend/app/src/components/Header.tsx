// Adapted from:
// https://codesandbox.io/s/k1wuo0?file=/demo.tsx
// https://codesandbox.io/s/persistentdrawerright-material-demo-forked-756g4v?file=/demo.tsx:2050-2054
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Translate from '@mui/icons-material/Translate';
import Logo from './Logo';
import {ConfigBar} from './ConfigBar';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const [configBarOpen, setOpen] = React.useState(false);
  
  const handleDrawerOpen = () => {
    setOpen(!configBarOpen);
  };

  const {i18n} = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <Logo />
          <Typography component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          {/* to be used for sign-in/sign-up
          <Button color="inherit">Sign In</Button>
          <Button color="secondary">Sign Up</Button>
          */}
          <IconButton
              size="large"
              color="inherit"
            >
              <Translate />
          </IconButton>
          <IconButton
              size="large"
              color="inherit"
            >
              <AccountCircle />
          </IconButton>
          <IconButton
              size="large"
              color="inherit"
              onClick={handleDrawerOpen}
            >
              <Settings />
          </IconButton>
          </Toolbar>
      </AppBar>
      <ConfigBar open={configBarOpen} />
    </Box>
  );
}

