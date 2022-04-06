const userConfigTypes = `
type UserConfig {
    user: User!
    savedLanguage: String
    savedIsoCodes: [String!]
    savedStartDate: String
    savedEndDate: String
}

input UserConfigInput {
    user: ID!
    savedLanguage: String
    savedIsoCodes: [String!]
    savedStartDate: String
    savedEndDate: String
}
`;

const userConfigRootQuery = `
    userConfigs(user: String!): [UserConfig!]
    getMostRecentSavedIsoCodes(user: String!): UserConfig!
    getMostRecentSavedLanguage(user: String!): UserConfig!
    getMostRecentSavedDateRange(user: String!): UserConfig!
`;

const userConfigRootMutation = `
    addUserConfig(userConfigInput: UserConfigInput!): Bool!
    removeUserConfig(userConfigId: ID!): Bool!
`;

exports.userConfigTypes = userConfigTypes;
exports.userConfigRootQuery = userConfigRootQuery;
exports.userConfigRootMutation = userConfigRootMutation;
