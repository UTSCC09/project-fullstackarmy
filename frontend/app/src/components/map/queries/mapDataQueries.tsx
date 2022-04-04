import { gql } from '@apollo/client';

// First Dose Map
export const GET_VACC_MAP_COUNTRY_DATA = gql`
query CountryVaccMapData($startDate: String!, $endDate: String!){
  countryVaccMapData(startDate: $startDate, endDate: $endDate) {
    isoCode
    peopleVaccinatedPerHundred
  }
}
`;

export const GET_VACC_MAP_CONTINENT_DATA = gql`
query ContinentVaccMapData($startDate: String!, $endDate: String!){
  continentVaccMapData(startDate: $startDate, endDate: $endDate) {
    isoCode
    peopleVaccinatedPerHundred
  }
}
`;

// Second Dose Map
export const GET_FULL_VACC_MAP_COUNTRY_DATA = gql`
  query CountryFullyVaccMapData($startDate: String!, $endDate: String!){
    countryFullyVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      peopleFullyVaccinatedPerHundred
    }
  }
`;

export const GET_FULL_VACC_MAP_CONTINENT_DATA = gql`
  query ContinentFullyVaccMapData($startDate: String!, $endDate: String!){
    continentFullyVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      peopleFullyVaccinatedPerHundred
    }
  }
`;

// Third Dose Map
export const GET_BOOSTER_VACC_MAP_COUNTRY_DATA = gql`
  query CountryBoosterVaccMapData($startDate: String!, $endDate: String!){
    countryBoosterVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      totalBoostersPerHundred
    }
  }
`;

export const GET_BOOSTER_VACC_MAP_CONTINENT_DATA = gql`
  query ContinentBoosterVaccMapData($startDate: String!, $endDate: String!){
    continentBoosterVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      totalBoostersPerHundred
    }
  }
`;

// Distribution Map
export const GET_VACC_DISTRIB_COUNTRY_DATA = gql`
query	CountryVaccDistribMapData {
  countryVaccDistribMapData {
    isoCode
    dosesDeliveredRequiredPercent
    dosesExpectedRequiredPercent
  }
}
`;