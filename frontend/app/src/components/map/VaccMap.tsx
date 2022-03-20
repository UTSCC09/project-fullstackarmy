import React from 'react'
import MapContainer from './mapComponents/MapContainer';
import { gql, useQuery } from '@apollo/client';

interface Props {
}

const VaccMap: React.FC<Props> = () => {
  
  // todo make the range dynamic here
	const startDate = '2021-01-01';
	const endDate = '2022-03-17';
  let featureData;

	const GET_VACC_MAP_DATA = gql`
    query CountryVaccMapData($startDate: String!, $endDate: String!){
      countryVaccMapData(startDate: $startDate, endDate: $endDate) {
        isoCode
        peopleVaccinatedPerHundred
      }
    }
  `;
  
  //todo create interfaces for the data
  const { loading, error, data } = useQuery(GET_VACC_MAP_DATA,
    {
      variables: {
        startDate,
        endDate,
      }
    }
  );
  
  //todo should make loading and error map components
  if (loading) return null;
  if (error) return null;

  if (data) {
    featureData = data.countryVaccMapData.map(dataRow => {
      return {
        isoCode: dataRow.isoCode,
        value: dataRow.peopleVaccinatedPerHundred,
      }
    })
  }

  return (
    <MapContainer featureData={featureData} />
  )
}

export default VaccMap


