import { QueryResult, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Error from '../elements/Error/Error';
import Loading from '../elements/Loading/Loading';
import {
  BinaryLegend,
  ScaledLegend,
  VaccinationThresholds,
} from './components/MapConstants';
import VaccinationMap from './components/VaccinationMap';
import VaccinationWriteUp from './components/VaccinationWriteUp';
import {
  GET_VACC_MAP_CONTINENT_DATA,
  GET_VACC_MAP_COUNTRY_DATA,
} from './queries/mapDataQueries';
import {
  ContinentVaccMapData,
  CountryVaccMapData,
  TimePeriodVars,
} from './types/types';

interface Props {}

// todo make the range dynamic here
const startDate = '2021-01-01';
const endDate = '2022-03-17';

const mapName = 'FirstDoseVaccMap';
const featureValueName = 'peopleVaccinatedPerHundred';

const VaccMap: React.FC<Props> = () => {
  const [featureData, setFeatureData] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const { t } = useTranslation();

  // Get both data at once, even though some of it may not be used by the user
  // this is to ensure the user experience is fast and high quality
  const countryData: QueryResult<CountryVaccMapData, TimePeriodVars> = useQuery(
    GET_VACC_MAP_COUNTRY_DATA,
    {
      variables: {
        startDate,
        endDate,
      },
      onCompleted: (data) => {
        setFeatureData(data.countryVaccMapData);
        setExcelData(data.countryVaccMapData);
      },
    }
  );

  const continentData: QueryResult<ContinentVaccMapData, TimePeriodVars> =
    useQuery(GET_VACC_MAP_CONTINENT_DATA, {
      variables: {
        startDate,
        endDate,
      },
    });

  /**
   * Makes the backend call to get the associated map data for country/continent
   * @param {boolean} isContinentCall
   */
  const continentDataCall = (isContinentCall: boolean) => {
    if (isContinentCall) {
      setFeatureData(continentData.data.continentVaccMapData);
    } else {
      setFeatureData(countryData.data.countryVaccMapData);
    }
  };

  if (countryData && countryData.loading) return <Loading />;
  if (continentData && continentData.loading) return <Loading />;
  if (countryData && countryData.error)
    return <Error message={countryData.error.message} />;
  if (continentData && continentData.error)
    return <Error message={continentData.error.message} />;

  return (
    <>
      <VaccinationMap
        mapName={mapName}
        featureValueName={featureValueName}
        featureData={featureData}
        primaryLegend={BinaryLegend}
        secondaryLegendToggle={true}
        secondaryLegendName={t('mapGeneral.scaledLegend')}
        secondaryLegend={ScaledLegend}
        continentToggle={true}
        continentDataCall={continentDataCall}
      />
      <VaccinationWriteUp
        dosageLevel={t('statusTab.firstDose')}
        bookName={mapName}
        featureData={excelData}
        valueName={featureValueName}
        thresholds={VaccinationThresholds}
      />
    </>
  );
};

export default VaccMap;
