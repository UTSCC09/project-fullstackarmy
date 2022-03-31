import React from 'react'
import Box from '@mui/material/Box';

// Adapted from https://mui.com/components/tabs/ example
interface Props {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
const StatusTabPanel:React.FC<Props> = ({
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
          {value === index && (
            <Box sx={{ p: 3 }}>
              {children}
            </Box>
          )}
        </div>
      );
}

export default StatusTabPanel