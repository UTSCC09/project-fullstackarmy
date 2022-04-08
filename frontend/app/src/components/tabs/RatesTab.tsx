import { t } from 'i18next';
import HerdImmunityTimeSeriesChart from '../charts/HerdImmunityTimeSeriesChart';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface Props {}

const RatesTab: React.FC<Props> = () => {
  return (
    <div>
      <Paper elevation={2} sx={{margin: 2, padding: 2}}>
        <Typography variant='body1'>
          {t('ratesTab.p1')}
        </Typography>
      </Paper>
      <Paper elevation={2} sx={{margin: 2, padding: 2}}>
        <HerdImmunityTimeSeriesChart />
      </Paper>
      <Paper elevation={2} sx={{margin: 2, padding: 2}}>
        <Typography variant='body1'>
          {t('ratesTab.p2')}
        </Typography> 
        <Typography variant='body1'>
        {t('ratesTab.p3')}
        </Typography>
      </Paper>
    </div>
  );
};

export default RatesTab;
