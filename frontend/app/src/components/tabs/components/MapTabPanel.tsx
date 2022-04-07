import React from 'react';
import Box from '@mui/material/Box';
import '../styles/MapTabPanel.css';

// Adapted from https://mui.com/components/tabs/ example
interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const MapTabPanel: React.FC<Props> = ({ children, index, value }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className='statusTabPanel'
    >
      {value === index && (
        <Box
          className='statusTabPanelBox'
          sx={{
            p: 3,
            position: 'relative',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

export default MapTabPanel;
