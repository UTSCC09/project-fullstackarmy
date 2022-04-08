import { DocumentNode, gql } from '@apollo/client';

export const ALL_SAVED_CONFIGS: DocumentNode = gql`
  query UserConfigs($user: String!) {
    userConfigs(user: $user) {
      name
      savedLanguage
      savedIsoCodes
      savedStartDate
      savedEndDate
    }
  }
`;

export const SAVE_CONFIG: DocumentNode = gql`
  mutation AddUserConfig($userConfigInput: UserConfigInput!) {
    addUserConfig(userConfigInput: $userConfigInput) {
      bool
    }
  }
`;
