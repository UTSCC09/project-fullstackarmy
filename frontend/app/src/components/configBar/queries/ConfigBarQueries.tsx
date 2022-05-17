import { DocumentNode, gql } from '@apollo/client';

export const GET_COUNTRY_NAMES: DocumentNode = gql`
  query countryIsoCodes {
    countryIsoCodes {
      isoCode
      isoCodeName
    }
  }
`;
