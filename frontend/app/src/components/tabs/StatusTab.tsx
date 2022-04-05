import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HerdImmunityBarChart from '../charts/HerdImmunityBarChart';
import BoosterVaccMap from '../map/BoosterVaccMap';
import FullVacMap from '../map/FullVaccMap';
import VaccMap from '../map/VaccMap';
import { t } from 'i18next';
import StatusTabPanel from './components/StatusTabPanel';

// From https://mui.com/components/tabs/ example
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/**
 * Status tab containing the herd immunity bar chart plus tabs
 * that help a user choose which heat map to display.
 * Only one heat map is displayed at a time.
 */
export const StatusTab: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className='status-tab'>
      {/* First is the bar chart */}
      <HerdImmunityBarChart />
      {/* Then is the tabs for the heat maps, which are displayed one at a time */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='map tabs'
            textColor='secondary'
            indicatorColor='secondary'
            centered
          >
            <Tab label={t('maptabs.firstdosemap')} {...a11yProps(0)} />
            <Tab label={t('maptabs.seconddosemap')} {...a11yProps(1)} />
            <Tab label={t('maptabs.boosterdosemap')} {...a11yProps(2)} />
          </Tabs>
        </Box>
        <StatusTabPanel
          value={value}
          index={0}
          title={t('maptabs.firstdosemap')}
        >
          <VaccMap />
        </StatusTabPanel>
        <StatusTabPanel
          value={value}
          index={1}
          title={t('maptabs.seconddosemap')}
        >
          <FullVacMap />
        </StatusTabPanel>
        <StatusTabPanel
          value={value}
          index={2}
          title={t('maptabs.boosterdosemap')}
        >
          <BoosterVaccMap />
        </StatusTabPanel>
      </Box>
    </div>
  );
};
