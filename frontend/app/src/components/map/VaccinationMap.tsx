import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { BinaryLegend, FeatureData, ScaledLegend } from './components/MapConstants';
import MapContainer from './components/MapContainer';
import './styles/VaccinationMap.css';

interface Props {
  mapName: string, 
  binaryFeatureStyling: boolean, 
  continentToggle: boolean, 
  featureData: FeatureData,
  featureValueName: string,
  continentDataCall?: Function,
}

let mapLegend = ScaledLegend;

type MapState = {
  binary: boolean,
  continents: boolean,
}

const initMapState: MapState = {
  binary: false,
  continents: false,
}

// Same as above properties
const binaryEventName: string = 'binary';
const continentEventName: string = 'continents';

const VaccinationMap: React.FC<Props> = ({mapName, binaryFeatureStyling, continentToggle, featureData, featureValueName, continentDataCall}) => {


  const [mapState, setMapState] = useState<MapState>(initMapState)

  // useEffect(() => {
  //   mapLegend = ScaledLegend;
  // }, [])

  const handleMapState = (event: ChangeEvent<HTMLInputElement>) => {
    const eventName: string = event.target.name;
    const checked = event.target.checked;

    if (eventName === binaryEventName && checked) {
      mapLegend = BinaryLegend;
    } else if (eventName === binaryEventName && !checked) {
      mapLegend = ScaledLegend;
    } else if (eventName === continentEventName) {
      if(continentDataCall) continentDataCall(checked);
    } 

    setMapState({
      ...mapState,
      [eventName]: checked,
    })
  }

  return (
    <div className='map-wrapper'>
      <FormGroup id='map-controls'>
        {
          binaryFeatureStyling 
          && 
          <FormControlLabel control={
              <Switch checked={mapState.binary} onChange={handleMapState} name={binaryEventName}/>
            }
            label="Binary" 
          />
        }
        {
          continentToggle 
          && 
          <FormControlLabel control={
              <Switch checked={mapState.continents} onChange={handleMapState} name={continentEventName}/>
            }
            label="Continents" 
          />
        }
      </FormGroup>
      <MapContainer featureData={featureData} mapLegend={mapLegend} mapName={mapName} featureValueName={featureValueName} isContinentFeatures={mapState.continents}/>
    </div>
  )
}

export default React.memo(VaccinationMap);


