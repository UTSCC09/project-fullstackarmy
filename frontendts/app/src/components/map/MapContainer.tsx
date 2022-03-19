import React from 'react'
import { Wrapper} from "@googlemaps/react-wrapper";
import Map from './Map';

interface Props {
}

const apiKey: string = "AIzaSyCscGGvV3_l1nM4YabksgUCPWFuuLOXrzA";
const height: string = "50vh";
const deafultZoom: number = 1.7;

// ? From documentation
// const render = (status: Status): ReactElement => {
//   // if (status === Status.FAILURE) return <Map zoom={8} center={8}/>;
//   return <Map zoom={8} center={{lat: -34.397, lng: 150.644 }} height={"100vh"}/>;
// };

const center = {lat: 0, lng: 0}

const MapContainer: React.FC<Props> = () => {

  return (
    <Wrapper 
      apiKey={apiKey}
    >
      <Map zoom={deafultZoom} center={center} height={height}>
      </Map>
    </Wrapper>  
  )
}

export default MapContainer


