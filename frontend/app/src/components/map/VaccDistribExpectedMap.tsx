import { QueryResult, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Loading from '../elements/Loading/Loading';
import Error from '../elements/Error/Error';
import {
  ScaledPlusLegend,
  TernaryLegend,
  VaccDistribThresholds,
} from './components/MapConstants';
import VaccinationMap from './components/VaccinationMap';
import { GET_VACC_DISTRIB_COUNTRY_DATA } from './queries/mapDataQueries';
import { CountryVaccDistribMapData, TimePeriodVars } from './types/types';
import DistributionWriteUp from './components/DistributionWriteUp';
import { useTranslation } from 'react-i18next';

interface Props {}

const mapName = 'vaccDistribExpectedMap';
const featureValueName = 'dosesExpectedRequiredPercent';

const VaccDistribExpectedMap: React.FC<Props> = () => {
  const [featureData, setFeatureData] = useState(null);
  const { t } = useTranslation();

  const distribCountryData: QueryResult<
    CountryVaccDistribMapData,
    TimePeriodVars
  > = useQuery(GET_VACC_DISTRIB_COUNTRY_DATA, {
    onCompleted: (data) => {
      setFeatureData(data.countryVaccDistribMapData);
    },
  });

  if (distribCountryData && distribCountryData.loading) return <Loading />;
  if (distribCountryData && distribCountryData.error)
    return <Error message={distribCountryData.error.message} />;

  return (
    <>
      <VaccinationMap
        mapName={mapName}
        featureValueName={featureValueName}
        featureData={featureData}
        primaryLegend={TernaryLegend}
        secondaryLegendToggle={true}
        secondaryLegendName={t('mapGeneral.scaledLegend')}
        secondaryLegend={ScaledPlusLegend}
        continentToggle={false}
      />
      <DistributionWriteUp
        doseType={t('distributionTab.expected')}
        bookName={t('distributionTab.bookNameExpected')}
        featureData={featureData}
        valueName={featureValueName}
        thresholds={VaccDistribThresholds}
      />
    </>
  );
};

export default VaccDistribExpectedMap;
