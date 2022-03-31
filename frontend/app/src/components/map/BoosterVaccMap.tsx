import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Loading from '../elements/Loading';
import VaccinationMap from './VaccinationMap';

interface Props {
}

// todo make the range dynamic here
const startDate = '2021-01-01';
const endDate = '2022-03-17';

const GET_BOOSTER_VACC_MAP_COUNTRY_DATA = gql`
  query CountryBoosterVaccMapData($startDate: String!, $endDate: String!){
    countryBoosterVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      totalBoostersPerHundred
    }
  }
`;

const GET_BOOSTER_VACCT_MAP_CONTINEN_DATA = gql`
  query ContinentBoosterVaccMapData($startDate: String!, $endDate: String!){
    continentBoosterVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      totalBoostersPerHundred
    }
  }
`;

const mapName = 'BoosterVaccMap';
const featureValueName = 'totalBoostersPerHundred';

const BoosterVaccMap: React.FC<Props> = () => {

  const [featureData, setFeatureData] = useState(null);

  // Get both data at once, even though some of it may not be used by the user
  // this is to ensure the user experience is fast and high quality
  const countryData = useQuery(GET_BOOSTER_VACC_MAP_COUNTRY_DATA, 
    {
      variables: {
        startDate,
        endDate,
      },
      onCompleted: (data) => {
        setFeatureData(data.countryBoosterVaccMapData);
      }
    }
  );

  const continentData = useQuery(GET_BOOSTER_VACCT_MAP_CONTINEN_DATA, {
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
      setFeatureData(continentData.data.continentBoosterVaccMapData);
    } else {
      setFeatureData(countryData.data.countryBoosterVaccMapData);
    }
  }

  // add error component
  if (countryData && countryData.loading) return <Loading />;
  if (continentData && continentData.loading) return <Loading />;
  if (countryData && countryData.error) return null;
  if (continentData && continentData.error) return null;

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

export default BoosterVaccMap


