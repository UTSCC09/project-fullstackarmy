import React from 'react'
import MapContainer from './mapComponents/MapContainer';
import { gql, useQuery } from '@apollo/client';

interface Props {
}

const BoosterVaccMap: React.FC<Props> = () => {

  // todo make the range dynamic here
	const startDate = '2021-01-01';
	const endDate = '2022-03-17';
  let featureData;

	const GET_FULL_VACC_MAP_DATA = gql`
    query CountryBoosterVaccMapData($startDate: String!, $endDate: String!){
      countryBoosterVaccMapData(startDate: $startDate, endDate: $endDate) {
        isoCode
        totalBoostersPerHundred
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
    featureData = data.countryBoosterVaccMapData.map(dataRow => {
      return {
        isoCode: dataRow.isoCode,
        value: dataRow.totalBoostersPerHundred,
      }
    })
  }

  return (
    <MapContainer featureData={featureData} />
  )
}

export default BoosterVaccMap


