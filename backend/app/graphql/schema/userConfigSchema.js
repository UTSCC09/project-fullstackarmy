const userConfigTypes = `
type UserConfig {
    name: String!
    user: User!
    savedLanguage: String
    savedIsoCodes: [String!]
    savedStartDate: String
    savedEndDate: String
}

input UserConfigInput {
    name: String!
    user: ID!
    savedLanguage: String
    savedIsoCodes: [String!]
    savedStartDate: String
    savedEndDate: String
}
`;

const userConfigRootQuery = `
    userConfigs(user: String!): [UserConfig!]
`;

const userConfigRootMutation = `
    addUserConfig(userConfigInput: UserConfigInput!): Bool!
`;

exports.userConfigTypes = userConfigTypes;
exports.userConfigRootQuery = userConfigRootQuery;
exports.userConfigRootMutation = userConfigRootMutation;
