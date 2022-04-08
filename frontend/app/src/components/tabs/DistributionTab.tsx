import React from 'react';
import VaccDoseDemand from '../charts/VaccDoseDemand';
import VaccDistribDeliveredMap from '../map/VaccDistribDeliveredMap';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import MapTabPanel from './components/MapTabPanel';
import VaccDistribExpectedMap from '../map/VaccDistribExpectedMap';
import { a11yProps } from './components/TabHelpers';
import './styles/MapTab.css';

interface Props {}

const DistributionTab: React.FC<Props> = () => {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper elevation={2} sx={{margin: 2, padding: 2}}>
        <Typography variant='body1'>
          {t('distributionTab.p1')}
        </Typography>
        <Typography variant='body1'>
          {t('distributionTab.p2')}
        </Typography>
        <Typography variant='body1'>
          {t('distributionTab.p3')}
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{margin: 2, padding: 2}}>
        <VaccDoseDemand />
      </Paper>
      <Paper elevation={2} sx={{margin: 2, padding: 2}}>
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
              <Tab label={t('distributionTab.firstMapTitle')} {...a11yProps(0)} />
              <Tab
                label={t('distributionTab.secondMapTitle')}
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <MapTabPanel value={value} index={0}>
            <VaccDistribDeliveredMap />
          </MapTabPanel>
          <MapTabPanel value={value} index={1}>
            <VaccDistribExpectedMap />
          </MapTabPanel>
        </Box>
      </Paper>
    </div>
  );
};

export default DistributionTab;
