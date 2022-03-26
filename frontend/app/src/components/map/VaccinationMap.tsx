import React, { ChangeEvent, useState } from 'react'
import MapContainer from './components/MapContainer';
import {BinaryLegend, ScaledLegend, FeatureData} from './components/MapConstants';
import {FormGroup, FormControlLabel, Switch } from '@mui/material';
import './styles/VaccinationMap.css';

interface Props {
  mapName: string, 
  binaryFeatureStyling: boolean, 
  featureData: FeatureData,
  featureValueName: string,
  dataCall?: Function,
}

let mapLegend = ScaledLegend;

const initState = {
  binary: false,
  continents: false,
}
const binaryEventName: string = 'binary';
const continentEventName: string = 'continent';

const VaccinationMap: React.FC<Props> = ({mapName, binaryFeatureStyling, featureData, featureValueName, dataCall}) => {

  const [mapState, setMapState] = useState(initState)

  const handleMapState = (event: ChangeEvent<HTMLInputElement>) => {
    const eventName: string = event.target.name;

    if (eventName === binaryEventName && event.target.checked) {
      mapLegend = BinaryLegend;
    } else if (eventName === binaryEventName && !event.target.checked) {
      mapLegend = ScaledLegend;
    } else if (eventName === continentEventName && event.target.checked) {
      if(dataCall) dataCall('continent');
    } else if (eventName === continentEventName && !event.target.checked) {
      if(dataCall) dataCall('country');
    }

    setMapState({
      ...mapState,
      [eventName]: event.target.checked,
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
        <FormControlLabel control={
            <Switch checked={mapState.continents} onChange={handleMapState} name={continentEventName}/>
          } 
          label="Continents" 
        />
      </FormGroup>
      <MapContainer featureData={featureData} mapLegend={mapLegend} mapName={mapName} featureValueName={featureValueName}/>
    </div>
  )
}

export default VaccinationMap


