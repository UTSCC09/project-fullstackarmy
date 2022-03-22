import React from 'react'
import MapContainer from './components/MapContainer';
import { gql, useQuery } from '@apollo/client';
import Loading from '../elements/Loading';
import * as MapConstants from './components/MapConstants';

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
  
  const { loading, error, data } = useQuery(GET_VACC_MAP_DATA,
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
    featureData = data.countryVaccMapData.map(dataRow => {
      return {
        isoCode: dataRow.isoCode,
        value: dataRow.peopleVaccinatedPerHundred,
      }
    })
  }

  return (
    // <MapContainer featureData={featureData} mapLegend={MapConstants.ScaledLegend} />
    <></>
  )
}

export default VaccMap


