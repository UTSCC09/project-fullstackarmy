import React from 'react';

interface Props {
  height: string;
}

const MapError: React.FC<Props> = (height) => {
  return (
    <div className='map map-error' style={height}>
      <div className='error'></div>
    </div>
  );
};

export default MapError;
