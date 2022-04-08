// Adapted from:
// https://codesandbox.io/s/persistentdrawerright-material-demo-forked-756g4v?file=/demo.tsx:2050-2054
import React from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { CountriesFilter } from './CountriesFilter';
import { DateFilter } from './DateFilter';
import { useTranslation } from 'react-i18next';
import SavedConfigs from './userconfig/SavedConfigs';
import { UserContext } from './context/UserContext';
import { ColorModeToggle } from './ColorModeToggle';

interface Props {
  open: boolean;
  handleClose: Function;
}

const ConfigBar: React.FC<Props> = ({ open, handleClose }) => {
  const { user } = React.useContext(UserContext);
  const { t } = useTranslation();

  const closeDrawer = () => {
    if (open) {
      handleClose();
    }
  };

  return (
    <Drawer
      sx={{
        width: 260,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
        },
      }}
      variant='temporary'
      anchor='left'
      open={open}
      onBackdropClick={closeDrawer}
    >
      <Typography variant='subtitle1' align='left' sx={{ marginLeft: '14px' }}>
        {t('configbar.region')}
      </Typography>
      <CountriesFilter />

      <Divider />

      <Typography variant='subtitle1' align='left' sx={{ marginLeft: '14px' }}>
        {t('configbar.date')}
      </Typography>
      <DateFilter />
      <Divider sx={{ marginTop: '14px' }} />

      <Typography variant='subtitle1' align='left' sx={{ marginLeft: '14px' }}>
        {t('configbar.mode')}
      </Typography>

      <ColorModeToggle />

      {user !== null && (
        <>
          <Divider sx={{ marginTop: '14px' }} />

          <SavedConfigs />
        </>
      )}
    </Drawer>
  );
};
export default ConfigBar;
