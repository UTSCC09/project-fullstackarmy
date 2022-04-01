import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Loading from '../elements/Loading';
import QueryError from '../elements/QueryError';
import VaccinationMap from './VaccinationMap';

interface Props {
}

// make the range dynamic here
const startDate = '2021-01-01';
const endDate = '2022-03-17';

// move to separate file
const GET_FULL_VACC_MAP_COUNTRY_DATA = gql`
  query CountryFullyVaccMapData($startDate: String!, $endDate: String!){
    countryFullyVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      peopleFullyVaccinatedPerHundred
    }
  }
`;

const GET_FULL_VACC_MAP_CONTINENT_DATA = gql`
  query CountryFullyVaccMapData($startDate: String!, $endDate: String!){
    continentFullyVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      peopleFullyVaccinatedPerHundred
    }
  }
`;

const mapName: string = 'FullVacMap';
const featureValueName: string = 'peopleFullyVaccinatedPerHundred';

const FullVacMap: React.FC<Props> = () => {

  const [featureData, setFeatureData] = useState(null);

  // Get both data at once, even though some of it may not be used by the user
  // this is to ensure the user experience is fast and high quality
  const countryData = useQuery(GET_FULL_VACC_MAP_COUNTRY_DATA, 
    {
      variables: {
        startDate,
        endDate,
      },
      onCompleted: (data) => {
        setFeatureData(data.countryFullyVaccMapData);
      }
    }
  );

  const continentData = useQuery(GET_FULL_VACC_MAP_CONTINENT_DATA, {
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
      setFeatureData(continentData.data.continentFullyVaccMapData);
    } else {
      setFeatureData(countryData.data.countryFullyVaccMapData);
    }
  }

  if (countryData && countryData.loading) return <Loading />;
  if (continentData && continentData.loading) return <Loading />;
  if (countryData && countryData.error) return <QueryError message={countryData.error.message}/>;
  if (continentData && continentData.error) return <QueryError message={continentData.error.message}/>;

  return (
    <VaccinationMap 
      mapName={mapName} 
      binaryFeatureStyling={true}
      continentToggle={true}
      featureData={featureData} 
      featureValueName={featureValueName}
      continentDataCall={continentDataCall}
    />
  )
}

export default FullVacMap