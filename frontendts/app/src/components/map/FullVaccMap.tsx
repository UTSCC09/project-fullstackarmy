import React from 'react'
import MapContainer from './mapComponents/MapContainer';
import { gql, useQuery } from '@apollo/client';

interface Props {
}

const FullVacMap: React.FC<Props> = () => {
  
  // todo make the range dynamic here
	const startDate = '2021-01-01';
	const endDate = '2022-03-17';
  let featureData;

  //TODO change the data
	const GET_FULL_VACC_MAP_DATA = gql`
    query CountryFullyVaccMapData($startDate: String!, $endDate: String!){
      countryFullyVaccMapData(startDate: $startDate, endDate: $endDate) {
        isoCode
        peopleFullyVaccinatedPerHundred
      }
    }
  `;
  
  //todo create interfaces for the data
  const { loading, error, data } = useQuery(GET_FULL_VACC_MAP_DATA,
    {
      variables: {
        startDate,
        endDate,
      }
    }
  );
  
  if (data) {
    featureData = data.countryFullyVaccMapData.map(dataRow => {
      return {
        isoCode: dataRow.isoCode,
        value: dataRow.peopleFullyVaccinatedPerHundred,
      }
    })
  }

  return (
    <MapContainer featureData={featureData} />
  )
}

export default FullVacMap


