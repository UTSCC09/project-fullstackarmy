import { t } from 'i18next';
import HerdImmunityTimeSeriesChart from '../charts/HerdImmunityTimeSeriesChart';

interface Props {}

const RatesTab: React.FC<Props> = () => {
  return (
    <div>
      <p>{t('ratesTab.p1')}</p>
      <HerdImmunityTimeSeriesChart />
      <p>{t('ratesTab.p2')}</p>
      <p>{t('ratesTab.p3')}</p>
    </div>
  );
};

export default RatesTab;
