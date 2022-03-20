import React, { ReactNode, useEffect, useRef, useState } from 'react'
import MapStyles from './MapStyles';
import './Map.css';

interface Props {
  center: google.maps.LatLngLiteral;
  zoom: number;
  height: string;
  children: ReactNode;
}

const Map: React.FC<Props> = ({center, zoom, height, children}) => {
  const ref = useRef<HTMLDivElement>();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  const style = {height};

  useEffect(() => {
    const newMap = new window.google.maps.Map(ref.current!, {styles: MapStyles})
    setMap(newMap);
  }, []);

  if (map) {
    map.setCenter(center);
    map.setZoom(zoom);
  }

  return (
    <div ref={ref} style={style} id="map">
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