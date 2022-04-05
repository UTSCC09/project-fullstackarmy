const userConfigTypes = `
type UserConfig {
    user: User!
    savedLanguage: String
    savedCountries: [String!]
    savedDates: DateRange
}

input UserConfigInput {
    user: User!
    savedLanguage: String
    savedCountries: [String!]
    savedDates: DateRange
}
`;

const userConfigRootQuery = `
    userConfigs(user: String!): [UserConfig!]
`;

const userConfigRootMutation = `
    addUserConfig(userConfigDataInput: UserConfigDataInput!): Bool!
    removeUserConfig(userConfigId: ID!): Bool!
`

exports.userConfigTypes = userConfigTypes;
exports.userConfigRootQuery = userConfigRootQuery;
exports.userConfigRootMutation = userConfigRootMutation;