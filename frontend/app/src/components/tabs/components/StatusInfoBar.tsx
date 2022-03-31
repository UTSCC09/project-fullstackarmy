import React, { useEffect, useRef, useState } from 'react'
import Drawer from "@mui/material/Drawer";
import Divider from '@mui/material/Divider';
// import { makeStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';
import { t } from 'i18next';

interface Props {
    open: boolean
    mapInfoType: string
    height: number
}

// const useStyles = makeStyles({
//     drawer: {
//       position: "relative",
//       marginLeft: "auto",
//       width: 200,
//       "& .MuiBackdrop-root": {
//         display: "none"
//       },
//       "& .MuiDrawer-paper": {
//         width: 200,
//         position: "absolute",
//         height: (props: { height: number }) => props.height,
//         transition: "none !important"
//       }
//     }
//   });

const StatusInfoBar = ({open, mapInfoType, height}) => {
//   const classes = useStyles({ height: height });
  
  let caption
  switch(mapInfoType) {
      case 'firstdose':
        caption = t('mapinfo.firstdoseinfo')
        break;
      case 'seconddose':
        caption = t('mapinfo.seconddoseinfo')
        break;
      case 'boosterdose':
        caption = t('mapinfo.boosterdoseinfo')
        break;
      default:
        caption = ''
        break;
  }
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
    >   
      <Typography variant="body1" align="left" sx={{marginLeft:'14px'}}>{caption}</Typography>
    </Drawer>
  )
}

export default StatusInfoBar