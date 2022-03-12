import React from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api'
import mapStyles from './mapStyles';

/**
 * Plan:
 * 
 * - mostly interested continental and country features
 * - will have a function that draws the features on the map which will be one map
 * - these features will have to be colored and the colors come from the function that
 * we pass to the component
 * - infowindows on the map to show the statistics
 */
const Map = () => {

  const libraries = [];
  
  const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
  }

  const center = {
    lat: 43.651070,
    long: -79.347015
  }

  // Custom styles
  const options = {
    styles: mapStyles,
    disableDefaultUI: true
  }

  const { isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={options}
    ></GoogleMap>
  )
}

export default Map