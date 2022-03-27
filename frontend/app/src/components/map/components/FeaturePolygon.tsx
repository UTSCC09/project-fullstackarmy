import React from 'react'
import { MapLegend, isoCodeProperty, isoCodeNameProperty, CountryFeaturesURL, ContinentFeaturesURL } from './MapConstants';

interface Props {
  map: google.maps.Map | null;
  featureData: any;
  valueName: string;
  mapLegend: MapLegend;
  isContinentFeatures: boolean;
}

let areFeaturesAdded: boolean = false;

const FeaturePolygon: React.FC<Props> = ({map, featureData, valueName, mapLegend, isContinentFeatures}) => {

  const infoWindow: google.maps.InfoWindow = new window.google.maps.InfoWindow();

  if (!(map && mapLegend)) return null;

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
      let content: string;

      if (value) {
        content = `
          <div style="font-size: 14px; display: flex; flex-direction: column;">
            <div>Region: ${country}</div>
            <div>Percentage: ${value}%</div>
          </div>
        `;
      } else {
        content = `
          <div style="font-size: 14px; display: flex; flex-direction: column;">
            <div>Region: ${country}</div>
            <div>Percentage: N/A</div>
          </div>
        `;
      }
      
      infoWindow.setContent(content);
      infoWindow.setPosition(e.latLng);
      infoWindow.open({
        map: map
      })
    }
  }
  
  /** 
  * Mouse closes the infoWindow when the mouse leaves the polygon
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

  // Modifies the Event prototype so it will affect how the Google Library behaves.
  // Otherwise non-passive event listener violations will appear in the console.
  // Credits: https://stackoverflow.com/questions/47799388/javascript-google-maps-api-non-passive-event-handlers
  (function () {
    if (typeof EventTarget !== "undefined") {
      let func = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function (type, fn, capture) {
        this.func = func;
        if(typeof capture !== "boolean"){
          capture = capture || {};
          capture.passive = false;
        }
        this.func(type, fn, capture);
      };
    };
  }());

  // No features then add the features needed once, and not removed in case of toggle
  // then there is no ned to keep adding and removing
  if (!areFeaturesAdded) {

    map.data.addListener('mouseover', (e) => {mouseInFeature(e, map, infoWindow)});
    map.data.addListener('mouseout', (e) => {mouseOutOfFeature(e, infoWindow)});

    const addContinentFeatures = fetch(ContinentFeaturesURL);
    const addCountryFeatures = fetch(CountryFeaturesURL);

    Promise.all([addContinentFeatures, addCountryFeatures]).then(responses => {
      return Promise.all(responses.map(response => response.json()));
    }).then(data => { 
      // ! this is a heavy task so i should probably do it in a seperate thread
      // might be fine here but i need to think about it
      
      console.log(data[0]);
      console.log(data[1]);

      map.data.addGeoJson(data[0], {
        idPropertyName: isoCodeProperty 
      });

      map.data.addGeoJson(data[1], {
        idPropertyName: isoCodeProperty 
      });

      featureData.forEach(isoCodeData => {
        const isoCodeFeature: google.maps.Data.Feature = map.data.getFeatureById(isoCodeData.isoCode);
    
        if (isoCodeFeature) isoCodeFeature.setProperty(valueName, isoCodeData[valueName]);
      })

      areFeaturesAdded = true;
    }).catch(error => {
      console.log(error);
    });
  } else{
    featureData.forEach(isoCodeData => {
      const isoCodeFeature: google.maps.Data.Feature = map.data.getFeatureById(isoCodeData.isoCode);
  
      if (isoCodeFeature) isoCodeFeature.setProperty(valueName, isoCodeData[valueName]);
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