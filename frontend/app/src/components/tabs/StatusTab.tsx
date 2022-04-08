import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import HerdImmunityBarChart from '../charts/HerdImmunityBarChart';
import BoosterVaccMap from '../map/BoosterVaccMap';
import FullVacMap from '../map/FullVaccMap';
import VaccMap from '../map/VaccMap';
import { useTranslation } from 'react-i18next';
import MapTabPanel from './components/MapTabPanel';
import './styles/MapTab.css';
import { a11yProps } from './components/TabHelpers';

/**
 * Status tab containing the herd immunity bar chart plus tabs
 * that help a user choose which heat map to display.
 * Only one heat map is displayed at a time.
 */
export const StatusTab: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='status-tab tab'>
      <Paper elevation={2} sx={{ margin: 2, padding: 2 }}>
        <Typography variant='body1'>{t('statusTab.p1')}</Typography>
        <Typography variant='body1'>{t('statusTab.p2')}</Typography>
        <Typography variant='body1'>{t('statusTab.p3')}</Typography>
        <Typography variant='body1'>{t('statusTab.p4')}</Typography>
      </Paper>

      <Paper elevation={2} sx={{ margin: 2, padding: 2 }}>
        <HerdImmunityBarChart />
      </Paper>

      <Paper elevation={2} sx={{ margin: 2, padding: 2 }}>
        <Box className='mapBox' sx={{ width: '100%' }}>
          <Box className='mapTabsContainer'>
            <Tabs
              orientation='vertical'
              value={value}
              onChange={handleChange}
              aria-label='map tabs'
              textColor='secondary'
              indicatorColor='secondary'
              centered
            >
              <Tab label={t('statusTab.firstMapTitle')} {...a11yProps(0)} />
              <Tab label={t('statusTab.secondMapTitle')} {...a11yProps(1)} />
              <Tab label={t('statusTab.thirdMapTitle')} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <MapTabPanel value={value} index={0}>
            <VaccMap />
          </MapTabPanel>
          <MapTabPanel value={value} index={1}>
            <FullVacMap />
          </MapTabPanel>
          <MapTabPanel value={value} index={2}>
            <BoosterVaccMap />
          </MapTabPanel>
        </Box>
      </Paper>
    </div>
  );
};
