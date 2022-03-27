import React from 'react'
import HerdImmunityBarChart from "../charts/HerdImmunityBarChart";
import BoosterVaccMap from '../map/BoosterVaccMap';
import FullVacMap from '../map/FullVaccMap';
import VaccMap from '../map/VaccMap';

export const StatusTab = () => {

  return (
    <div>
      <HerdImmunityBarChart />
      <h2 className="chart-title">First Vaccination Dose Heat Map</h2>
      <VaccMap /> 
      {/* <h2>Second Vaccination Dose Heat Map</h2>
      <FullVacMap />  
      <h2>Booster Dose Heat Map</h2>
      <BoosterVaccMap />   */}
    </div>
  )
}