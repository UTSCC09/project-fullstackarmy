import Drawer from "@mui/material/Drawer";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';

interface Props {
    open: boolean
    mapInfoType: string
    height: number
}
/**
 * A separate component for the information panel.
 * Currently, not in use because depends on how the write-up will be set up.
 */
const StatusInfoBar: React.FC<Props> = ({open, mapInfoType, height}) => {
  
  let captionTitle
  let caption
  switch(mapInfoType) {
      case 'firstdose':
        captionTitle = t('mapinfo.title.firstdose')
        caption = t('mapinfo.content.firstdose')
        break;
      case 'seconddose':
        captionTitle = t('mapinfo.title.seconddose')
        caption = t('mapinfo.content.seconddose')
        break;
      case 'boosterdose':
        captionTitle = t('mapinfo.title.boosterdose')
        caption = t('mapinfo.content.boosterdose')
        break;
      default:
        caption = ''
        break;
  }
  return (
    <Drawer
        sx={{ 
            zIndex: 1300,
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
        open={open}
      >
      <Typography variant="h5" align="left" sx={{marginLeft:'14px'}}>{captionTitle}</Typography>
      <Divider/>
      <Typography variant="body1" align="left" sx={{marginLeft:'14px'}}>{caption}</Typography>
    </Drawer>
  )
}

export default StatusInfoBar