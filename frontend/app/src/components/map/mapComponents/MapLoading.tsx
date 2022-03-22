import React from 'react'

interface Props {
}

const MapLoading: React.FC<Props> = () => {
  return (
    <div className="map map-loading">
        <div className="loader"></div>
    </div>
    )
}

export default MapLoading


