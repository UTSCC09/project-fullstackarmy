import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import Loading from '../elements/Loading';
import VaccinationMap from './VaccinationMap';

interface Props {
}

// make the range dynamic here
const startDate = '2021-01-01';
const endDate = '2022-03-17';

// move to separate file
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

const mapName: string = 'FullVacMap';
const featureValueName: string = 'peopleFullyVaccinatedPerHundred';

let featureData;

const FullVacMap: React.FC<Props> = () => {
  const [getCountryData, countryData] = useLazyQuery(GET_FULL_VACC_COUNTRY_MAP_DATA);
  const [getContinentData, continentData] = useLazyQuery(GET_FULL_VACC_CONTINENT_MAP_DATA);
  
  /** 
  * Makes the backend call to get the associated map data for country/continent
  * @param {boolean} isContinentCall
  */
  const continentDataCall = (isContinentCall: boolean) => {
    if (isContinentCall) {
      getContinentData({
        variables: {
          startDate,
          endDate,
        }
      });
    } else {
      getCountryData({
        variables: {
          startDate,
          endDate,
        }
      });
    }
  }

  useEffect(() => {
    getCountryData({
      variables: {
        startDate,
        endDate,
      }
    })
  }, [])

  // add error component
  if (countryData && countryData.loading) return <Loading />;
  if (continentData && continentData.loading) return <Loading />;
  if (countryData && countryData.error) return null;
  if (continentData && continentData.error) return null;

  if (countryData && countryData.data) featureData = countryData.data.countryFullyVaccMapData;
  if (continentData && continentData.data) featureData = continentData.data.continentFullyVaccMapData;

  // use context here so that it communicates directly with the map
  // about the toggle button
 
  return (
    <VaccinationMap 
      mapName={mapName} 
      binaryFeatureStyling={true} 
      featureData={featureData} 
      featureValueName={featureValueName}
      continentDataCall={continentDataCall}
    />
  )
}

export default FullVacMap