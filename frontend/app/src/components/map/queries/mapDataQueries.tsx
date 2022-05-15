import { DocumentNode, gql } from '@apollo/client';

// First Dose Map
export const GET_VACC_MAP_COUNTRY_DATA: DocumentNode = gql`
  query CountryVaccMapData($startDate: String!, $endDate: String!) {
    countryVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      isoCodeName
      peopleVaccinatedPerHundred
    }
  }
`;

export const GET_VACC_MAP_CONTINENT_DATA: DocumentNode = gql`
  query ContinentVaccMapData($startDate: String!, $endDate: String!) {
    continentVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      isoCodeName
      peopleVaccinatedPerHundred
    }
  }
`;

// Second Dose Map
export const GET_FULL_VACC_MAP_COUNTRY_DATA: DocumentNode = gql`
  query CountryFullyVaccMapData($startDate: String!, $endDate: String!) {
    countryFullyVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      isoCodeName
      peopleFullyVaccinatedPerHundred
    }
  }
`;

export const GET_FULL_VACC_MAP_CONTINENT_DATA: DocumentNode = gql`
  query ContinentFullyVaccMapData($startDate: String!, $endDate: String!) {
    continentFullyVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      isoCodeName
      peopleFullyVaccinatedPerHundred
    }
  }
`;

// Third Dose Map
export const GET_BOOSTER_VACC_MAP_COUNTRY_DATA: DocumentNode = gql`
  query CountryBoosterVaccMapData($startDate: String!, $endDate: String!) {
    countryBoosterVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      isoCodeName
      totalBoostersPerHundred
    }
  }
`;

export const GET_BOOSTER_VACC_MAP_CONTINENT_DATA: DocumentNode = gql`
  query ContinentBoosterVaccMapData($startDate: String!, $endDate: String!) {
    continentBoosterVaccMapData(startDate: $startDate, endDate: $endDate) {
      isoCode
      isoCodeName
      totalBoostersPerHundred
    }
  }
`;

// Distribution Map
export const GET_VACC_DISTRIB_COUNTRY_DATA: DocumentNode = gql`
  query CountryVaccDistribMapData {
    countryVaccDistribMapData {
      isoCode
      isoCodeName
      dosesDeliveredRequiredPercent
      dosesExpectedRequiredPercent
    }
  }
`;
