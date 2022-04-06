import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Map from './Map';
import Legend from './Legend';
import FeaturePolygon from './FeaturePolygon';
import Loading from '../../elements/Loading';
import MapError from './MapError';
import '../styles/MapContainer.css';
import { MapLegend } from './MapConstants';

interface Props {
  featureData: any;
  mapLegend: MapLegend;
  mapName: string;
  featureValueName: string;
  isContinentFeatures: boolean;
}

const defaultHeight: string = '600px';
const deafultZoom: number = 2.1;
const defaultCenter = { lat: 0, lng: 0 };

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <Loading />;
    case Status.FAILURE:
      return <MapError height={defaultHeight} />;
  }
};

const MapContainer: React.FC<Props> = ({
  mapName,
  mapLegend,
  featureData,
  featureValueName,
  isContinentFeatures,
}) => {
  // Here the children are created everytime, therefore they need to be memo'ed to ensure that they are not
  // causing a rendering of the map everytime and only change when the features change
  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
      <Map
        zoom={deafultZoom}
        center={defaultCenter}
        height={defaultHeight}
        mapName={mapName}
      >
        <Legend map={null} mapLegend={mapLegend} />
        <FeaturePolygon
          map={null}
          featureData={featureData}
          mapLegend={mapLegend}
          valueName={featureValueName}
          isContinentFeatures={isContinentFeatures}
        />
      </Map>
    </Wrapper>
  );
};

export default MapContainer;
