import React, {useEffect, useRef, useState} from 'react'
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Drawer from "@mui/material/Drawer";
import Typography from '@mui/material/Typography';

import { t } from 'i18next';
import StatusInfoBar from './StatusInfoBar'

interface Props {
    type: string
}
const StatusTabPanelHeader: React.FC<Props> = ({type}) => {
  const [height, setHeight] = useState(0);
  const [infoOpen, setOpen] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    if (infoOpen) {
      setHeight(containerRef.current.clientHeight - 64);
    } else {
      setHeight(0);
    }
  }, [infoOpen]);
  const handleDrawerOpen = () => {
    setOpen(!infoOpen);
  };

  let title
  let caption
  switch(type) {
      case 'firstdose':
        title = t('maptabs.firstdosemap')
        caption = t('mapinfo.firstdoseinfo')
        break;
      case 'seconddose':
        title = t('maptabs.seconddosemap')
        caption = t('mapinfo.seconddoseinfo')
        break;
      case 'boosterdose':
        title = t('maptabs.boosterdosemap')
        caption = t('mapinfo.boosterdoseinfo')
        break;
      default:
        title = ''
        caption=''
        break;
  }

  return (
    <div className="status-tab-panel-header" ref={containerRef} style={{ position: "relative" }}>
      <Toolbar>
        <h2 className="chart-title">{title}</h2>
        <IconButton
          size="large"
          color="inherit"
          className="info-btn"
          onClick={handleDrawerOpen}>
          <InfoIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        sx={{ 
            zIndex: 1300,
            '& .MuiDrawer-root': {
                position: 'absolute'
            },
            '& .MuiPaper-root': {
                position: 'absolute'
            },
        }}
        variant="persistent"
        anchor="right"
        open={infoOpen}
      >   
      <Typography variant="body1" align="left" sx={{marginLeft:'14px'}}>{caption}</Typography>
    </Drawer>
    </div>
  )
}

export default StatusTabPanelHeader