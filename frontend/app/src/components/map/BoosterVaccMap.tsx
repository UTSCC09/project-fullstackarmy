import React from 'react'
import MapContainer from './components/MapContainer';
import { gql, useQuery } from '@apollo/client';
import Loading from '../elements/Loading';
import * as MapConstants from './components/MapConstants';

interface Props {
}

const mapName = 'BoosterVaccMap';

const BoosterVaccMap: React.FC<Props> = () => {

  // todo make the range dynamic here
	const startDate = '2021-01-01';
	const endDate = '2022-03-17';
  let featureData;
  let mapLegend;
  let binary = true;

	const GET_BOOSTER_VACC_MAP_DATA = gql`
    query CountryBoosterVaccMapData($startDate: String!, $endDate: String!){
      countryBoosterVaccMapData(startDate: $startDate, endDate: $endDate) {
        isoCode
        totalBoostersPerHundred
      }
    }
  `;
  
  const { loading, error, data } = useQuery(GET_BOOSTER_VACC_MAP_DATA,
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
    featureData = data.countryBoosterVaccMapData.map(dataRow => {
      return {
        isoCode: dataRow.isoCode,
        value: dataRow.totalBoostersPerHundred,
      }
    })

    if (binary) {
      mapLegend = MapConstants.BinaryLegend;
    } else {
      mapLegend = MapConstants.ScaledLegend
    }
  }
  
  const featureValueName = 'boosterVacc';

  return (
    <MapContainer featureData={featureData} mapLegend={mapLegend} mapName={mapName} featureValueName={featureValueName}/>
  )
}

export default BoosterVaccMap


