import { DocumentNode, gql } from '@apollo/client';

export const ALL_SAVED_CONFIGS: DocumentNode = gql`
  query UserConfigs($user: String!) {
    userConfigs(user: $user) {
      name
      savedLanguage
      savedIsoCodes
      savedDates
    }
  }
`;
