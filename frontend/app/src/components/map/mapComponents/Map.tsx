import React, { ReactNode, useEffect, useRef, useState } from 'react'
import MapStyles from './MapStyles';

interface Props {
  center: google.maps.LatLngLiteral;
  zoom: number;
  height: string;
  children: ReactNode;
}

const mapOptions: google.maps.MapOptions = {
  styles: MapStyles,
  streetViewControl: false,
}

const Map: React.FC<Props> = ({center, zoom, height, children}) => {
  const ref = useRef<HTMLDivElement>();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  const style = {height};

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current!, mapOptions)
      setMap(newMap);
    }
  }, [ref, map]);

  if (map) {
    map.setCenter(center);
    map.setZoom(zoom);
  }

  return (
    <div ref={ref} style={style} className="map">
      {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
          // set the map prop on the child components like markers, feature polygons, legend etc.
          return React.cloneElement(child, { map });
        }
      })}
    </div>
  );
}

export default Map