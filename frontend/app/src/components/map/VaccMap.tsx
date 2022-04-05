import { QueryResult, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Loading from '../elements/Loading';
import QueryError from '../elements/QueryError';
import { BinaryLegend, ScaledLegend, ScaledLegendName } from './components/MapConstants';
import VaccinationMap from './components/VaccinationMap';
import { GET_VACC_MAP_CONTINENT_DATA, GET_VACC_MAP_COUNTRY_DATA } from './queries/mapDataQueries';
import { ContinentVaccMapData, CountryVaccMapData, TimePeriodVars } from './types/types';

interface Props {
}

// todo make the range dynamic here
const startDate = '2021-01-01';
const endDate = '2022-03-17';

const mapName = 'FirstDoseVaccMap';
const featureValueName = 'peopleVaccinatedPerHundred';

const VaccMap: React.FC<Props> = () => {
 
  const [featureData, setFeatureData] = useState(null);

  // Get both data at once, even though some of it may not be used by the user
  // this is to ensure the user experience is fast and high quality
  const countryData: QueryResult<CountryVaccMapData, TimePeriodVars> = useQuery(GET_VACC_MAP_COUNTRY_DATA, 
    {
      variables: {
        startDate,
        endDate,
      },
      onCompleted: (data) => {
        setFeatureData(data.countryVaccMapData);
      }
    }
  );

  const continentData: QueryResult<ContinentVaccMapData, TimePeriodVars> = useQuery(GET_VACC_MAP_CONTINENT_DATA, {
      variables: {
        startDate,
        endDate,
      }
    }
  );
  
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
  }

  if (countryData && countryData.loading) return <Loading />;
  if (continentData && continentData.loading) return <Loading />;
  if (countryData && countryData.error) return <QueryError message={countryData.error.message}/>;
  if (continentData && continentData.error) return <QueryError message={continentData.error.message}/>;
  
  return (
    <VaccinationMap 
      mapName={mapName}
      featureValueName={featureValueName}
      featureData={featureData} 
      primaryLegend={BinaryLegend}
      secondaryLegendToggle={true}
      secondaryLegendName={ScaledLegendName}
      secondaryLegend={ScaledLegend}
      continentToggle={true}
      continentDataCall={continentDataCall}
    />
  )
}

export default VaccMap


