import React, {useEffect, useRef, useState} from 'react'
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Drawer from "@mui/material/Drawer";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { t } from 'i18next';


interface Props {
    type: string,
    panelHeight: number
}

/**
 * The header of the status tab's map panels
 * Currently includes an info button that toggles the info panel
 * Height of info panel is currently dependent on the panel height, but
 * may change depending on the write-up
 */
const StatusTabPanelHeader: React.FC<Props> = ({type, panelHeight}) => {
  const [height, setHeight] = useState(0);
  const [infoOpen, setOpen] = useState(false);
  const headerContainerRef = useRef(null);

  useEffect(() => {
    if (infoOpen) {
      setHeight(panelHeight);
    } else {
      setHeight(0);
    }
  }, [infoOpen, panelHeight]);
  const handleDrawerOpen = () => {
    setOpen(!infoOpen);
  };

  let title
  let captionTitle
  let caption
  switch(type) {
      case 'firstdose':
        title = t('maptabs.firstdosemap')
        captionTitle = t('mapinfo.title.firstdose')
        caption = t('mapinfo.content.firstdose')
        break;
      case 'seconddose':
        title = t('maptabs.seconddosemap')
        captionTitle = t('mapinfo.title.seconddose')
        caption = t('mapinfo.content.seconddose')
        break;
      case 'boosterdose':
        title = t('maptabs.boosterdosemap')
        captionTitle = t('mapinfo.title.boosterdose')
        caption = t('mapinfo.content.boosterdose')
        break;
      default:
        title = ''
        captionTitle = ''
        caption=''
        break;
  }

  return (
    <div className="status-tab-panel-header" ref={headerContainerRef} style={{ position: "relative" }}>
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
      {/* Drawer needs to stay here for the height to stay within the panel */}
      <Drawer
        sx={{ 
            zIndex: 1300,
            // position: 'relative',
            width: '40%',
            marginLeft: "auto",
            "& .MuiDrawer-paper": {
                width: '40%',
                position: "absolute",
                height: height
            }
        }}
        variant="persistent"
        anchor="right"
        open={infoOpen}
      >
      <Typography variant="h5" align="left" sx={{marginLeft:'14px'}}>{captionTitle}</Typography>
      <Divider/>
      <Typography variant="body1" align="left" sx={{marginLeft:'14px'}}>{caption}</Typography>
    </Drawer>
    </div>
  )
}

export default StatusTabPanelHeader