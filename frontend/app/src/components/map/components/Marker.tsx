import React, { useEffect, useState } from 'react'

interface Props {
    position: google.maps.LatLngLiteral;
    map?: google.maps.Map;
}

const Marker: React.FC<Props> = ({position, map}) => {
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    setMarker(new google.maps.Marker({})) ;
  }, []);

  if (marker) {
    marker.setMap(map);
    marker.setPosition(position);
  }

  return null;
}

export default Marker
