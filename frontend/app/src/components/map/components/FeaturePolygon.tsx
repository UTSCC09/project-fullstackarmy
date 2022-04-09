import React from 'react';
import {
  hoverProperty,
  isoCodeContinentType,
  isoCodeCountryType,
  isoCodeNameProperty,
  isoCodeProperty,
  isoCodeTypeProperty,
  MapLegend,
  mapStrokeColor,
} from './MapConstants';

interface Props {
  map: google.maps.Map | null;
  featureData: any;
  valueName: string;
  mapLegend: MapLegend;
  isContinentFeatures: boolean;
}

let firstFeatureAdded: google.maps.Data.Feature | null = null;

const FeaturePolygon: React.FC<Props> = ({
  map,
  featureData,
  valueName,
  mapLegend,
  isContinentFeatures,
}) => {
  const infoWindow: google.maps.InfoWindow =
    new window.google.maps.InfoWindow();

  if (!(map && mapLegend !== null)) return null;

  /**
   * Modifies the Event prototype so it will affect how the Google Library behaves.
   * Otherwise non-passive event listener violations will appear in the console.
   * @note Credits: https://stackoverflow.com/questions/47799388/javascript-google-maps-api-non-passive-event-handlers
   */
  (function () {
    if (typeof EventTarget !== 'undefined') {
      let func = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function (type, fn, capture) {
        this.func = func;
        if (typeof capture !== 'boolean') {
          capture = capture || {};
          capture.passive = false;
        }
        this.func(type, fn, capture);
      };
    }
  })();

  // * Prop dependent helpers
  /**
   * Mouse goes in the geometry of the feature name
   * @param {google.maps.Data.MouseEvent} e - mouse event
   * @param {google.maps.Map | null} map - map parent component
   * @param {google.maps.InfoWindow} infoWindow
   */
  const mouseInFeature = (
    e: google.maps.Data.MouseEvent,
    map: google.maps.Map | null,
    infoWindow: google.maps.InfoWindow
  ) => {
    const feature: google.maps.Data.Feature = e.feature;
    feature.setProperty('hover', true); // setting hover state to change style

    const country = feature.getProperty(isoCodeNameProperty);
    const metric = feature.getProperty(valueName);

    if (map) {
      let content: string;

      if (metric) {
        content = `
          <div style="font-size: 14px; display: flex; flex-direction: column; color: black !important;">
            <div>Region: ${country}</div>
            <div>Percentage: ${metric}%</div>
          </div>
        `;
      } else {
        content = `
          <div style="font-size: 14px; display: flex; flex-direction: column; color: black !important;">
            <div>Region: ${country}</div>
            <div>Percentage: No Data</div>
          </div>
        `;
      }

      infoWindow.setContent(content);
      infoWindow.setPosition(e.latLng);
      infoWindow.open({
        map: map,
      });
    }
  };

  /**
   * Mouse closes the infoWindow when the mouse leaves the polygon
   * @param {google.maps.Data.MouseEvent} e - mouseEvent
   * @param {google.maps.InfoWindow} infoWindow - the open info window
   */
  const mouseOutOfFeature = (
    e: google.maps.Data.MouseEvent,
    infoWindow: google.maps.InfoWindow
  ) => {
    e.feature.setProperty('hover', false); // resetting hover state
    infoWindow.close();
  };

  /**
   * Function to style the google maps feature
   * @param {google.maps.Data.Feature} feature - polygon to be styled
   */
  const styleFeature = (feature: google.maps.Data.Feature) => {
    const hover = feature.getProperty(hoverProperty);
    const metric = feature.getProperty(valueName);
    const isoCodeType = feature.getProperty(isoCodeTypeProperty);

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
      fillOpacity = 0.7;
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

    if (isoCodeType === isoCodeContinentType && isContinentFeatures) {
      visible = true;
    } else if (isoCodeType === isoCodeCountryType && !isContinentFeatures) {
      visible = true;
    } else {
      visible = false;
    }

    const featureStyle: google.maps.Data.StyleOptions = {
      strokeColor: mapStrokeColor,
      strokeOpacity,
      strokeWeight,
      fillOpacity,
      fillColor,
      visible,
    };

    return featureStyle;
  };

  const addFeatreData = () => {
    if (!featureData) return;

    // check if the data has already been added here
    let sameMetricCounter = 0;

    for (let i = 0; i < featureData.length && i < 3; i++) {
      const isoCodeFeature: google.maps.Data.Feature = map.data.getFeatureById(
        featureData[i].isoCode
      );

      let metric;

      if (isoCodeFeature) metric = isoCodeFeature.getProperty(valueName);

      if (metric === featureData[i][valueName]) {
        sameMetricCounter++;
      } else {
        break;
      }
    }

    if (sameMetricCounter === featureData.length || sameMetricCounter === 3)
      return;

    // add the data
    featureData.forEach((isoCodeData) => {
      const isoCodeFeature: google.maps.Data.Feature = map.data.getFeatureById(
        isoCodeData.isoCode
      );

      if (isoCodeFeature)
        isoCodeFeature.setProperty(valueName, isoCodeData[valueName]);
    });
  };

  // * Render Logic
  map.data.setStyle(styleFeature);

  // No features then add the features needed once, and not removed in case of toggle
  // then there is no ned to keep adding and removing
  let areFeaturesAdded: boolean = map.data.contains(firstFeatureAdded);

  if (!areFeaturesAdded && featureData) {
    map.data.addListener('mouseover', (e) => {
      mouseInFeature(e, map, infoWindow);
    });
    map.data.addListener('mouseout', (e) => {
      mouseOutOfFeature(e, infoWindow);
    });

    const addContinentFeatures = fetch(
      process.env.REACT_APP_COUNTRY_FEATURES_URL
    );
    const addCountryFeatures = fetch(
      process.env.REACT_APP_CONTINENT_FEATURES_URL
    );

    Promise.all([addContinentFeatures, addCountryFeatures])
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((data) => {
        firstFeatureAdded = map.data.addGeoJson(data[0], {
          idPropertyName: isoCodeProperty,
        })[0];

        map.data.addGeoJson(data[1], {
          idPropertyName: isoCodeProperty,
        });

        addFeatreData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (areFeaturesAdded) {
    addFeatreData();
  }

  return null;
};

export default FeaturePolygon;
