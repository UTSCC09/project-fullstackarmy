import { QueryResult, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Loading from '../elements/Loading';
import QueryError from '../elements/QueryError';
import { BinaryLegend, ScaledLegend, ScaledLegendName, ScaledPlusLegend, TernaryLegend } from './components/MapConstants';
import VaccinationMap from './components/VaccinationMap';
import { GET_VACC_DISTRIB_COUNTRY_DATA } from './queries/mapDataQueries';
import { CountryVaccDistribMapData, TimePeriodVars } from './types/types';

interface Props {
}

const mapName = 'vaccDistribExpectedMap';
const featureValueName = 'dosesExpectedRequiredPercent';

const VaccDistribExpectedMap: React.FC<Props> = () => {
 
  const [featureData, setFeatureData] = useState(null);

  const distribCountryData: QueryResult<CountryVaccDistribMapData, TimePeriodVars> = useQuery(GET_VACC_DISTRIB_COUNTRY_DATA, 
    {
      onCompleted: (data) => {
        setFeatureData(data.countryVaccDistribMapData);
      }
    }
  );
  
  if (distribCountryData && distribCountryData.loading) return <Loading />;
  if (distribCountryData && distribCountryData.error) return <QueryError message={distribCountryData.error.message}/>;
  
  return (
    <VaccinationMap 
      mapName={mapName} 
      featureValueName={featureValueName}
      featureData={featureData} 
      primaryLegend={TernaryLegend}
      secondaryLegendToggle={true}
      secondaryLegendName={ScaledLegendName}
      secondaryLegend={ScaledPlusLegend}
      continentToggle={false}
    />
  )
}

export default VaccDistribExpectedMap