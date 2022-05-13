// Adapted from:
// https://codesandbox.io/s/persistentdrawerright-material-demo-forked-756g4v?file=/demo.tsx:2050-2054
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from './context/UserContext';
import { CountriesFilter } from './CountriesFilter';
import { DateFilter } from './DateFilter';
import SavedConfigs from './userconfig/SavedConfigs';

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

      {user !== null && (
        <>
          <Typography
            variant='subtitle1'
            align='left'
            sx={{ marginLeft: '14px' }}
          >
            {t('savedConfigs.title')}
          </Typography>
          <SavedConfigs />
        </>
      )}
    </Drawer>
  );
};
export default ConfigBar;
