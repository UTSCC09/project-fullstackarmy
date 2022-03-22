import React from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from './Map';
import Legend from './Legend';
import FeaturePolygon from './FeaturePolygon';
import MapLoading from './MapLoading';
import MapError from './MapError';
import './MapContainer.css';

interface Props {
  featureData: any;
}

const defaultHeight: string = "600px";
const deafultZoom: number = 1.8;
const defaultCenter = {lat: 0, lng: 0}

const LegendItems: [String, String][] = [
  ['#010a19', '91% - 100%'],
  ['#021e4b', '81% - 90%'],
  ['#03327c', '71% - 80%'],
  ['#0446ae', '61% - 70%'],
  ['#065ae0', '51% - 60%'],
  ['#1f74f9', '41% - 50%'],
  ['#5193fb', '31% - 40%'],
  ['#83b2fc', '21% - 30%'],
  ['#b4d1fd', '11% - 20%'],
  ['#e6f0fe', '0% - 10%']
]

const styleFeature = (feature: google.maps.Data.Feature) =>  {
  const hover = feature.getProperty('hover'); 
  const metric = feature.getProperty('value');
  
  let fillColor: string = '';
  let fillOpacity: number;
  let strokeWeight: number;
  let strokeOpacity: number;

  if (metric > 91) {
    fillColor = '#010a19';
  } else if (metric > 81) {
    fillColor = '#021e4b';
  } else if (metric > 71) {
    fillColor = '#03327c';
  } else if (metric > 61) {
    fillColor = '#0446ae';
  } else if (metric > 51) {
    fillColor = '#065ae0';
  } else if (metric > 41) {
    fillColor = '#1f74f9';
  } else if (metric > 31) {
    fillColor = '#5193fb';
  } else if (metric > 21) {
    fillColor = '#83b2fc';
  } else if (metric > 11) {
    fillColor = '#b4d1fd';
  } else {
    fillColor = '#e6f0fe';
  }

  if (hover) {
    fillOpacity = 0.95;
    strokeOpacity = 1;
    strokeWeight = 2;
  } else {
    fillOpacity =  0.7;
    strokeOpacity = 0.7;
    strokeWeight = 1;
  }

  const featureStyle = {
    strokeColor: "#fff",
    strokeOpacity,
    strokeWeight,
    fillOpacity,
    fillColor,
  };
  
  return featureStyle;
}

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <MapLoading />;
    case Status.FAILURE:
      return <MapError />;
  }
};

const MapContainer: React.FC<Props> = ({featureData}) => {
  
  //todo needs to be store in .env file

  return (
    <Wrapper 
      apiKey={'AIzaSyCscGGvV3_l1nM4YabksgUCPWFuuLOXrzA'}
      render={render}
    >
      <Map zoom={deafultZoom} center={defaultCenter} height={defaultHeight}>
        <Legend map={null} LegendItems={LegendItems}/>
        <FeaturePolygon map={null} featureData={featureData} styleFeature={styleFeature} />
      </Map>
    </Wrapper>  
  )
}

export default MapContainer