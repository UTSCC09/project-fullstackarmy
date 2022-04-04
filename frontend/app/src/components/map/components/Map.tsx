import React, { ReactNode, useEffect, useRef, useState } from 'react'
import MapStyles from './MapStyles';

interface Props {
  center: google.maps.LatLngLiteral;
  zoom: number;
  height: string;
  children: ReactNode;
  mapName: string;
}

const mapOptions: google.maps.MapOptions = {
  styles: MapStyles,
  streetViewControl: false,
  restriction: {
    latLngBounds: {
      north: 85,
      south: -85,
      west: -180,
      east: 180,
    },
    strictBounds: true,
  },
}

const Map: React.FC<Props> = ({center, zoom, height, children, mapName}) => {
  const ref = useRef<HTMLDivElement>();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  const style = {height};

  // Creates the map once on render
  // we dont want this component to render again since it's pointless for it to
  useEffect(() => {
    const newMap = new window.google.maps.Map(ref.current!, mapOptions)
    setMap(newMap);
  }, []);

  if (map) {
    map.setCenter(center);
    map.setZoom(zoom);
  }

  return (
    <div ref={ref} style={style} id={mapName} className="map">
      {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
          // set the map prop on the child components like markers, feature polygons, legend etc.
          return React.cloneElement(child, { map });
        }
      })}
    </div>
  );
}

export default Map;