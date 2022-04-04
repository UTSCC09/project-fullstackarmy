// First Dose Map
export interface VaccMapDataEl {
    isoCode: string;
    peopleVaccinatedPerHundred: number;
}
  
export interface CountryVaccMapData {
    countryVaccMapData: VaccMapDataEl[];
}
  
export interface ContinentVaccMapData {
    continentVaccMapData: VaccMapDataEl[];
}

// Second Dose Map
export interface FullVaccMapDataEl {
    isoCode: string;
    peopleFullyVaccinatedPerHundred: number;
}

export interface CountryFullyVaccMapData {
    countryFullyVaccMapData: FullVaccMapDataEl[];
}
  
export interface ContinentFullyVaccMapData {
    continentFullyVaccMapData: FullVaccMapDataEl[];
}

// Third Dose Map
export interface BoosterVaccMapDataEl {
    isoCode: string;
    totalBoostersPerHundred: number;
}

export interface CountryBoosterVaccMapData {
    countryBoosterVaccMapData: BoosterVaccMapDataEl[];
}
  
export interface ContinentBoosterVaccMapData {
    continentBoosterVaccMapData: BoosterVaccMapDataEl[];
}

// Distribution Map
export interface DistribVaccMapDataEl {
    isoCode: string;
    dosesDeliveredRequiredPercent: number;
    dosesExpectedRequiredPercent: number;
}

export interface CountryVaccDistribMapData {
    countryVaccDistribMapData: DistribVaccMapDataEl[];
}

// Time period params
export interface TimePeriodVars {
    startDate: string;
    endDate: string;
}