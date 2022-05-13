import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/VaccinationMap.css';
import { FeatureData, MapLegend } from './MapConstants';
import MapContainer from './MapContainer';

interface Props {
  mapName: string;
  featureValueName: string;
  featureData: FeatureData;
  primaryLegend: MapLegend;
  secondaryLegendToggle: boolean;
  secondaryLegendName?: string;
  secondaryLegend?: MapLegend;
  continentToggle: boolean;
  continentDataCall?: Function;
}

type MapState = {
  secondaryLegend: boolean;
  continents: boolean;
};

const initMapState: MapState = {
  secondaryLegend: false,
  continents: false,
};

// Same as above propertie
const secondaryLegendEventName: string = 'secondaryLegend';
const continentEventName: string = 'continents';

const VaccinationMap: React.FC<Props> = (args) => {
  const [mapState, setMapState] = useState<MapState>(initMapState);
  const [mapLegend, setMapLegend] = useState<MapLegend>(args.primaryLegend);
  const { t } = useTranslation();

  // let continentsLabel = t('mapGeneral.continents');

  const handleMapState = (event: ChangeEvent<HTMLInputElement>) => {
    const eventName: string = event.target.name;
    const checked = event.target.checked;

    if (eventName === secondaryLegendEventName && checked) {
      setMapLegend(args.secondaryLegend);
    } else if (eventName === secondaryLegendEventName && !checked) {
      setMapLegend(args.primaryLegend);
    } else if (eventName === continentEventName) {
      if (args.continentDataCall) args.continentDataCall(checked);
    }

    setMapState({
      ...mapState,
      [eventName]: checked,
    });
  };

  return (
    <div className='map-wrapper'>
      <FormGroup id='map-controls'>
        {args.secondaryLegendToggle && (
          <FormControlLabel
            control={
              <Switch
                color='secondary'
                checked={mapState.secondaryLegend}
                onChange={handleMapState}
                name={secondaryLegendEventName}
              />
            }
            label={args.secondaryLegendName}
          />
        )}
        {args.continentToggle && (
          <FormControlLabel
            control={
              <Switch
                color='secondary'
                checked={mapState.continents}
                onChange={handleMapState}
                name={continentEventName}
              />
            }
            label={t('mapGeneral.continents') as string}
          />
        )}
      </FormGroup>
      <MapContainer
        featureData={args.featureData}
        mapLegend={mapLegend}
        mapName={args.mapName}
        featureValueName={args.featureValueName}
        isContinentFeatures={mapState.continents}
      />
    </div>
  );
};

export default React.memo(VaccinationMap);
