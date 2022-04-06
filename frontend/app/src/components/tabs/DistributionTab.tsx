import React from 'react';
import VaccDoseDemand from '../charts/VaccDoseDemand';
import VaccDistribDeliveredMap from '../map/VaccDistribDeliveredMap';

interface Props {}

const DistributionTab: React.FC<Props> = () => {
  return (
    <div>
      <VaccDoseDemand />
      <VaccDistribDeliveredMap />
      {/* <VaccDistribExpectedMap /> */}
    </div>
  );
};

export default DistributionTab;
