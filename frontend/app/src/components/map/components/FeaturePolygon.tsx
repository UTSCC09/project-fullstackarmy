import React, { useEffect, useState } from 'react'
import countryFeatures from '../featureData/countryFeatures.json';
import continentFeatures from '../featureData/continentFeatures.json';
import { MapLegend, isoCodeProperty, isoCodeNameProperty } from './MapConstants';

interface Props {
  map: google.maps.Map | null;
  featureData: any;
  valueName: string;
  mapLegend: MapLegend;
  isContinentFeatures: boolean;
}

const FeaturePolygon: React.FC<Props> = ({map, featureData, valueName, mapLegend, isContinentFeatures}) => {

  // * State
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const infoWindow: google.maps.InfoWindow = new window.google.maps.InfoWindow();
    setInfoWindow(infoWindow)
  }, []);

  if (!(map && mapLegend && infoWindow)) return null;

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
    
    const country = feature.getProperty(isoCodeNameProperty);
    const value = feature.getProperty(valueName);
  
    if (map) {
      const content: string = `
        <div style="font-size: 14px; display: flex; flex-direction: column;">
          <div>Region: ${country}</div>
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
    const isoCodeType = feature.getProperty('isoCodeType')

    let fillColor: string = '';
    let fillOpacity: number;
    let strokeWeight: number;
    let strokeOpacity: number;
    let visible: boolean;

    if (hover) {
      fillOpacity = 0.95;
      strokeOpacity = 1;
      strokeWeight = 2;
    } else {
      fillOpacity =  0.7;
      strokeOpacity = 0.7;
      strokeWeight = 1;
    }  

    if (metric) {
      for (let i = 0; i < mapLegend.length; i++) {
        if (metric > mapLegend[i][2]) {
          fillColor = mapLegend[i][0];
          break;
        }
      }
    } else {
      fillColor = '';
      fillOpacity = 0;
    }
 
    if (isoCodeType === 'continent' && isContinentFeatures) {
      visible = true;
    } else if (isoCodeType === 'country' && !isContinentFeatures) {
      visible = true;
    } else {
      visible = false;
    }

    const featureStyle: google.maps.Data.StyleOptions = {
      strokeColor: "#fff",
      strokeOpacity,
      strokeWeight,
      fillOpacity,
      fillColor,
      visible,
    };
    
    return featureStyle;
  }

  // * Render Logic

  map.data.setStyle(styleFeature);

  map.data.addListener('mouseover', (e) => {mouseInFeature(e, map, infoWindow)});
  map.data.addListener('mouseout', (e) => {mouseOutOfFeature(e, infoWindow)});

  // No features then add the features needed once, and not removed in case of toggle
  // then there is no ned to keep adding and removing

  const firstFeatureId: string = continentFeatures['features'][0]['properties']['isoCode'];

  if (!map.data.getFeatureById(firstFeatureId)) {
    map.data.addGeoJson(continentFeatures, {
      idPropertyName: isoCodeProperty
    });
  
    map.data.addGeoJson(countryFeatures, {
      idPropertyName: isoCodeProperty
    });
  }

  if (featureData) {  
    featureData.forEach(isoCodeData => {
      const isoCodeFeature: google.maps.Data.Feature = map.data.getFeatureById(isoCodeData.isoCode);

      if (isoCodeFeature) {
        isoCodeFeature.setProperty(valueName, isoCodeData[valueName]);
      }
    })
  }

  // Continent
  // map.data.addGeoJson(continentFeatures, {
  //   idPropertyName: isoCodeProperty
  // });
  
  // map.data.loadGeoJson(
  //   "https://raw.githubusercontent.com/mohamed-tayeh/geojson-data/main/continentFeatures.js"
  //   , {
  //   idPropertyName: isoCodeProperty
  // });

  // wait for the request to complete by listening for the first feature to be
  // added
  // google.maps.event.addListenerOnce(map.data, "addfeature", () => {
  //   loadFeatures();
  // });

  return null;
}

export default FeaturePolygon