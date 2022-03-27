import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Loading from '../elements/Loading';
import VaccinationMap from './VaccinationMap';

interface Props {
}

// todo make the range dynamic here
const startDate = '2021-01-01';
const endDate = '2022-03-17';

const GET_BOOSTER_VACC_COUNTRY_MAP_DATA = gql`
  query CountryBoosterVaccMapData($startDate: String!, $endDate: String!){
    countryBoosterVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      totalBoostersPerHundred
    }
  }
`;

const GET_BOOSTER_VACC_CONTINENT_MAP_DATA = gql`
  query CountryBoosterVaccMapData($startDate: String!, $endDate: String!){
    countryBoosterVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      totalBoostersPerHundred
    }
  }
`;

const mapName = 'BoosterVaccMap';
const featureValueName = 'totalBoostersPerHundred';

let featureData;

const BoosterVaccMap: React.FC<Props> = () => {

  const { loading, error, data } = useQuery(GET_BOOSTER_VACC_COUNTRY_MAP_DATA,
    {
      variables: {
        startDate,
        endDate,
      }
    }
  );
  
  // todo add error component
  if (loading) return <Loading />;
  if (error) return null;

  if (data) {
    featureData = data.countryBoosterVaccMapData;
  }

  return (
    <VaccinationMap 
      mapName={mapName} 
      binaryFeatureStyling={true} 
      continentToggle={true} 
      featureData={featureData} 
      featureValueName={featureValueName}
    />
  )
}

export default BoosterVaccMap


