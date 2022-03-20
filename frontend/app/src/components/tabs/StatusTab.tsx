import React from 'react'
import BoosterVaccMap from '../map/BoosterVaccMap'
import FullVacMap from '../map/FullVaccMap'
import VaccMap from '../map/VaccMap'

export const StatusTab = () => {

  return (
    <div>
      <h1>Vaccination Status</h1>
      <VaccMap />
      <FullVacMap />
      <BoosterVaccMap />
    </div>
  )
}