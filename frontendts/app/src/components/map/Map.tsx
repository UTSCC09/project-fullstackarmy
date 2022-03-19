import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import MapStyles from './MapStyles';
import continentFeatures from './data/countries.json';

interface Props {
  center: google.maps.LatLngLiteral;
  zoom: number;
  height: string;
  children: ReactNode;
}

const styleFeature = (feature: google.maps.Data.Feature) =>  {
  const property = feature.getProperty('ISO_A3');
  
  let fillColor: string = '';

  if (property === 'EGY') {
    fillColor = '#00f';
  } else {
    fillColor = '#f00';
  }

  return {
    strokeColor: "#fff",
    strokeOpacity: 0.4,
    strokeWeight: 1,
    fillColor,
    fillOpacity: 0.2,
  };
}

const Map: React.FC<Props> = ({center, zoom, height, children}) => {
  const ref = useRef<HTMLDivElement>();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const style = {height, margin: '3rem'};
  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current!, {styles: MapStyles}));
    // setMap(new window.google.maps.Map(ref.current!, {}));
  }, []);

  if (map) {
    map.data.setStyle(styleFeature);
    map.setCenter(center);
    map.setZoom(zoom);
    map.data.addGeoJson(continentFeatures, {
      idPropertyName: 'CONTINENT'
    });
  }

  // todo make sure to solve the ref issue where it needs strict to be false for it to work
  return (
    <div ref={ref} style={style} id="map">
    </div>
  );
}

export default Map


