// Adapted from:
// https://codesandbox.io/s/j01dyc?file=/demo.tsx:2589-2600
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { LanguageContext } from './context/LanguageProvider';
import { useTranslation } from 'react-i18next';

interface Props {
  anchorEl: null | HTMLElement;
  handleClose: Function;
}

const TranslationDropdown: React.FC<Props> = ({ anchorEl, handleClose }) => {
  const closeDropdown = () => {
    handleClose();
  };
  const { changeLanguage } = React.useContext(LanguageContext);

  const updateLanguage = (lang) => {
    closeDropdown();
    changeLanguage(lang);
  };

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <Menu
      id='menu-appbar'
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={closeDropdown}
    >
      <MenuItem
        onClick={() => {
          updateLanguage('en');
        }}
        sx={{ fontWeight: currentLanguage === 'en' ? 'bold' : '' }}
      >
        English
      </MenuItem>
      <MenuItem
        onClick={() => {
          updateLanguage('es');
        }}
        sx={{ fontWeight: currentLanguage === 'es' ? 'bold' : '' }}
      >
        Español
      </MenuItem>
      <MenuItem
        onClick={() => {
          updateLanguage('fr');
        }}
        sx={{ fontWeight: currentLanguage === 'fr' ? 'bold' : '' }}
      >
        Français
      </MenuItem>
      <MenuItem
        onClick={() => {
          updateLanguage('pt');
        }}
        sx={{ fontWeight: currentLanguage === 'pt' ? 'bold' : '' }}
      >
        Português
      </MenuItem>
    </Menu>
  );
};
export default TranslationDropdown;
