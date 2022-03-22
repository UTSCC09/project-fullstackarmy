import React, { useEffect, useState } from 'react'
import continentFeatures from '../featureData/countries.json';
import { MapLegend } from './MapConstants';

interface Props {
  map: google.maps.Map | null;
  featureData: any;
  mapLegend: MapLegend;
  valueName: string;
}

const FeaturePolygon: React.FC<Props> = ({map, featureData, mapLegend, valueName}) => {

  // * Prop dependent helpers
  /** 
  * Mouse goes in the geometry of the feature name
  * @param {google.maps.Data.MouseEvent} e - mouse event
  * @param {google.maps.Map | null} map - map parent component
  * @param {google.maps.InfoWindow} infoWindow
  */
  const mouseInFeature = (e: google.maps.Data.MouseEvent, map: google.maps.Map | null, infoWindow: google.maps.InfoWindow) => {
    const feature: google.maps.Data.Feature = e.feature;
    feature.setProperty('hover', true); // setting hover state to change style
    
    const country = feature.getProperty('ADMIN');
    const value = feature.getProperty(valueName);
  
    if (map) {
      const content: string = `
        <div style="font-size: 14px; display: flex; flex-direction: column;">
          <div>Country: ${country}</div>
          <div>Percentage: ${value}%</div>
        </div>
      `;
  
      infoWindow.setContent(content);
      infoWindow.setPosition(e.latLng);
      infoWindow.open({
        map: map
      })
    }
  }
  
  /** 
  * Mouse closes the infoWindow when the mouse leaves the polygon
  * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
  * @param {google.maps.Data.MouseEvent} e - mouseEvent
  * @param {google.maps.InfoWindow} infoWindow - the open info window
  */
  const mouseOutOfFeature = (e: google.maps.Data.MouseEvent, infoWindow: google.maps.InfoWindow) => {
    e.feature.setProperty('hover', false); // resetting hover state
    infoWindow.close();
  }

  /** 
  * Function to style the google maps feature
  * @param {google.maps.Data.Feature} feature - polygon to be styled
  */
  const styleFeature = (feature: google.maps.Data.Feature) =>  {
    const hover = feature.getProperty('hover'); 
    const metric = feature.getProperty(valueName);
    
    let fillColor: string = '';
    let fillOpacity: number;
    let strokeWeight: number;
    let strokeOpacity: number;
  
    for (let i = 0; i < mapLegend.length; i++) {
      if (metric > mapLegend[i][2]) {
        fillColor = mapLegend[i][0];
        break;
      }
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

  // * State
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const infoWindow: google.maps.InfoWindow = new window.google.maps.InfoWindow();
    setInfoWindow(infoWindow)
  }, []);

  // * Render Logic
  if (map && infoWindow) {
    map.data.setStyle(styleFeature);
    
    map.data.addListener('mouseover', (e) => {mouseInFeature(e, map, infoWindow)});
    map.data.addListener('mouseout', (e) => {mouseOutOfFeature(e, infoWindow)});

    //todo will need to make this dynamic based on the chosen features either country/continent data
    map.data.addGeoJson(continentFeatures, {
      idPropertyName: 'ISO_A3'
    });
    
    if (featureData) {

      featureData.forEach(isoCodeData => {
        const isoCodeFeature: google.maps.Data.Feature = map.data.getFeatureById(isoCodeData.isoCode);

        if (isoCodeFeature) {
          isoCodeFeature.setProperty(valueName, isoCodeData.value);
        }
      })
    }
  }

  return null;
}

export default FeaturePolygon