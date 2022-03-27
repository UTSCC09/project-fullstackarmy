import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Loading from '../elements/Loading';
import VaccinationMap from './VaccinationMap';

interface Props {
}

// todo make the range dynamic here
const startDate = '2021-01-01';
const endDate = '2022-03-17';

const GET_VACC_MAP_COUNTRY_DATA = gql`
  query CountryVaccMapData($startDate: String!, $endDate: String!){
    countryVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      peopleVaccinatedPerHundred
    }
  }
`;

const GET_VACC_MAP_CONTINENT_DATA = gql`
  query CountryVaccMapData($startDate: String!, $endDate: String!){
    countryVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      peopleVaccinatedPerHundred
    }
  }
`;

const mapName = 'FirstDoseVaccMap';
const featureValueName = 'peopleVaccinatedPerHundred';

let featureData;

const VaccMap: React.FC<Props> = () => {
 
  const { loading, error, data } = useQuery(GET_VACC_MAP_COUNTRY_DATA,
    {
      variables: {
        startDate,
        endDate,
      }
    }
  );
  
  //todo should make error components
  if (loading) return <Loading />;
  if (error) return null;

  if (data) {
    featureData = data.countryVaccMapData
  }
  
  return (
    <VaccinationMap 
      mapName={mapName} 
      binaryFeatureStyling={false} 
      continentToggle={true} 
      featureData={featureData} 
      featureValueName={featureValueName}
    />
  )
}

export default VaccMap


