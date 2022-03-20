import React from 'react'
import HerdImmunityBarChart from "../charts/HerdImmunityBarChart";
import BoosterVaccMap from '../map/BoosterVaccMap';
import FullVacMap from '../map/FullVaccMap';
import VaccMap from '../map/VaccMap';

export const StatusTab = () => {
  return (
    <div>
      <HerdImmunityBarChart />
      <VaccMap />  
      <FullVacMap />  
      <BoosterVaccMap />  
    </div>
  )
}