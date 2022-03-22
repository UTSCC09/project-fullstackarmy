import React from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from './Map';
import Legend from './Legend';
import FeaturePolygon from './FeaturePolygon';
import Loading from '../../elements/Loading';
import MapError from './MapError';
import '../styles/MapContainer.css';
import { MapLegend } from './MapConstants';

interface Props {
  featureData: any;
  mapLegend: MapLegend;
  mapName: string;
  featureValueName: string;
}

const defaultHeight: string = "600px";
const deafultZoom: number = 2.1;
const defaultCenter = {lat: 0, lng: 0}

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <Loading />
    case Status.FAILURE:
      return <MapError height={defaultHeight}/>;
  }
};

const MapContainer: React.FC<Props> = ({featureData, mapLegend, mapName, featureValueName}) => {
  
  //todo needs to be store in .env file

  return (
    <Wrapper 
      apiKey={'AIzaSyCscGGvV3_l1nM4YabksgUCPWFuuLOXrzA'}
      render={render}
    >
      <Map zoom={deafultZoom} center={defaultCenter} height={defaultHeight} mapName={mapName}>
        <Legend map={null} mapLegend={mapLegend} />
        <FeaturePolygon map={null} featureData={featureData} mapLegend={mapLegend} valueName={featureValueName}/>
      </Map>
    </Wrapper>  
  )
}

export default MapContainer