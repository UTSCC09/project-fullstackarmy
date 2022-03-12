import React from 'react'
import { Wrapper } from "@googlemaps/react-wrapper";


const Map = () => {
  return (
    <Wrapper apiKey={"YOUR_API_KEY"}>
      <MyMapComponent />
    </Wrapper>
  )
}

export default Map