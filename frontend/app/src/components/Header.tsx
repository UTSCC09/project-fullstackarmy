// Adapted from:
// https://codesandbox.io/s/k1wuo0?file=/demo.tsx
// https://codesandbox.io/s/persistentdrawerright-material-demo-forked-756g4v?file=/demo.tsx:2050-2054

import FilterAlt from '@mui/icons-material/FilterAlt';
import Translate from '@mui/icons-material/Translate';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link as RouterLink } from 'react-router-dom';
import { ColorModeToggle } from './ColorModeToggle';
import ConfigBar from './configBar/ConfigBar';
// import { UserContext } from './context/UserContext';
import Logo from './Logo';
import TranslationDropdown from './TranslationDropdown';

export const Header = () => {
  // State for handling configuration bar drawer
  const [configBarOpen, setOpen] = React.useState(false);
  // const { user, setUser } = React.useContext(UserContext);
  // const { t } = useTranslation();

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

  // const signOut = () => {
  //   setUser(null);
  // };

  return (
    <Box>
      <AppBar position='relative'>
        <Toolbar>
          <Logo />
          <Typography component='div' sx={{ flexGrow: 1 }}></Typography>

          {/* {user === null && (
            <>
              <Button component={RouterLink} to='/signin' color='inherit'>
                {t('signin')}
              </Button>
              <Button component={RouterLink} to='/signup' color='secondary'>
                {t('signup')}
              </Button>
            </>
          )}

          {user !== null && (
            <Button color='inherit' onClick={signOut}>
              {t('signout')}
            </Button>
          )} */}

          <IconButton
            size='large'
            color='inherit'
            onClick={handleTranslationMenu}
          >
            <Translate />
          </IconButton>

          <ColorModeToggle />

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
