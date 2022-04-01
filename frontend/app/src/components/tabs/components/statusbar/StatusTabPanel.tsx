import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import StatusTabPanelHeader from './StatusTabPanelHeader';

// Adapted from https://mui.com/components/tabs/ example
interface Props {
    children?: React.ReactNode;
    index: number;
    value: number;
    type: string;
  }
const StatusTabPanel:React.FC<Props> = ({
    children,
    index,
    value,
    type
}) => {
  const [panelHeight, setPanelHeight] = useState(0)
  const containerRef = useRef(null);
  useEffect(() => {
    //TODO: Can only hard code height
    // setPanelHeight(containerRef.current.clientHeight);
    setPanelHeight(734);
  }, [containerRef])
  return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          <StatusTabPanelHeader type={type} panelHeight={panelHeight}/>
          {value === index && (
            <Box 
              sx={{ 
                p: 3,
                position:'relative' 
              }}
                ref={containerRef}
              >
              {children}
            </Box>
          )}
        </div>
      );
}

export default StatusTabPanel