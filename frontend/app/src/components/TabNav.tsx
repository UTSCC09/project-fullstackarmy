// Adapted from:
// https://codesandbox.io/s/r9nldi?file=/demo.tsx:186-340
import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {BiInfoSquare} from 'react-icons/bi';
import {BiWorld} from 'react-icons/bi';
import {AiOutlineLineChart} from 'react-icons/ai';
import {BiBarChartSquare} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
interface Props {
  selected: string,
}

export const TabNav = ({selected}) => {
  const [value, setValue] = React.useState(selected);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        centered
      >
        <Tab 
          icon={<BiInfoSquare />} 
          iconPosition="start" 
          value="one" 
          label={t('tabnav.infotab')}
          component = {Link}
          to = '/'
        />
        <Tab 
          icon={<BiWorld />} 
          iconPosition="start" 
          value="two" 
          label={t('tabnav.statustab')} 
          component = {Link}
          to = '/vaccination-status'
        />
        <Tab 
          icon={<AiOutlineLineChart />} 
          iconPosition="start" 
          value="three" 
          label={t('tabnav.ratestab')} 
          component = {Link}
          to = '/vaccination-rates'
        />
        <Tab 
          icon={<BiBarChartSquare style={{transform: `rotate(90deg)`}}/>} 
          iconPosition="start" 
          value="four" 
          label={t('tabnav.distributiontab')} 
          component = {Link}
          to = '/vaccination-distribution'
        />
      </Tabs>
    </Box>
  );
}