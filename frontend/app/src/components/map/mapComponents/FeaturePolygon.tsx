import React, { useEffect, useState } from 'react'
import continentFeatures from '../featureData/countries.json';

interface Props {
  map: google.maps.Map | null;
  styleFeature: any;
  featureData: any;
}

//todo make it so that it follow the mouse around
const mouseInFeature = (e: google.maps.Data.MouseEvent, map: google.maps.Map | null, infoWindow: google.maps.InfoWindow) => {
  const feature: google.maps.Data.Feature = e.feature;
  feature.setProperty('hover', true); // setting hover state to change style
  const country = feature.getProperty('ADMIN');
  const value = feature.getProperty('value');

  if (map) {
    console.log('in if statement');
    const content: string = `
      <div style="font-size: 14px; display: flex; flex-direction: column;">
        <div>Country: ${country}</div>
        <div>Population Percentage Partially Vaccinated: ${value}</div>
      </div>
    `;

    infoWindow.setContent(content);
    infoWindow.setPosition(e.latLng);
    infoWindow.open({
      map: map
    })
  }
}

const mouseOutOfFeature = (e: google.maps.Data.MouseEvent, infoWindow: google.maps.InfoWindow) => {
  e.feature.setProperty('hover', false); // resetting hover state
  infoWindow.close();
}

const FeaturePolygon: React.FC<Props> = ({map, styleFeature, featureData}) => {
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const infoWindow: google.maps.InfoWindow = new window.google.maps.InfoWindow();
    setInfoWindow(infoWindow)
  }, []);

  if (map && infoWindow) {

    map.data.setStyle(styleFeature);
    
    map.data.addListener('mouseover', (e) => {mouseInFeature(e, map, infoWindow)});
    map.data.addListener('mouseout', (e) => {mouseOutOfFeature(e, infoWindow)});

    //todo will need to make this dynamic based on the chosen features either country/continent
    map.data.addGeoJson(continentFeatures, {
      idPropertyName: 'ISO_A3'
    });
    
    if (featureData) {

      featureData.forEach(isoCodeData => {
        const isoCodeFeature: google.maps.Data.Feature = map.data.getFeatureById(isoCodeData.isoCode);

        if (isoCodeFeature) {
          isoCodeFeature.setProperty('value', isoCodeData.value);
        }
      })
    }
  }

  return null;
}

export default FeaturePolygon