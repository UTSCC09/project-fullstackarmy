import React from 'react'
import Box from '@mui/material/Box';

// Adapted from https://mui.com/components/tabs/ example
interface Props {
    title: string;
    children?: React.ReactNode;
    index: number;
    value: number;
  }
const StatusTabPanel:React.FC<Props> = ({
    title,
    children,
    index,
    value
}) => {
  return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          <h2 className="chart-title">{title}</h2>
          {value === index && (
            <Box 
              sx={{ 
                p: 3,
                position:'relative' 
              }}>
              {children}
            </Box>
          )}
        </div>
      );
}

export default StatusTabPanel