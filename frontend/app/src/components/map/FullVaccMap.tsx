import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Loading from '../elements/Loading';
import VaccinationMap from './VaccinationMap';

interface Props {
}

// todo make the range dynamic here
const startDate = '2021-01-01';
const endDate = '2022-03-17';

const GET_FULL_VACC_COUNTRY_MAP_DATA = gql`
  query CountryFullyVaccMapData($startDate: String!, $endDate: String!){
    countryFullyVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      peopleFullyVaccinatedPerHundred
    }
  }
`;

const GET_FULL_VACC_CONTINENT_MAP_DATA = gql`
  query CountryFullyVaccMapData($startDate: String!, $endDate: String!){
    continentFullyVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      peopleFullyVaccinatedPerHundred
    }
  }
`;

const mapName = 'FullVacMap';
const featureValueName = 'peopleFullyVaccinatedPerHundred';

let featureData;

const FullVacMap: React.FC<Props> = () => {
  
  const { loading, error, data } = useQuery(GET_FULL_VACC_CONTINENT_MAP_DATA,
    {
      variables: {
        startDate,
        endDate,
      }
    }
  );
  
  // const dataCall = (type: 'country' | 'continent') => {
  //   if (type === 'country') {
      
  //   } else if (type === 'continent') {
  //     const { loading, error, data } = useQuery(GET_FULL_VACC_COUNTRY_MAP_DATA,
  //       {
  //         variables: {
  //           startDate,
  //           endDate,
  //         }
  //       }
  //     );
  //   }
  // }

  // todo add error component
  if (loading) return <Loading />;
  if (error) return null;
  // if (data) featureData = data.countryFullyVaccMapData;
  if (data) featureData = data.continentFullyVaccMapData;

  return (
    <VaccinationMap mapName={mapName} binaryFeatureStyling={true} featureData={featureData} featureValueName={featureValueName} />
  )
}

export default FullVacMap