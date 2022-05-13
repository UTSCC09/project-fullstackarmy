// Adapted from https://github.com/academind/yt-graphql-react-event-booking-api/tree/10-auth-middleware
const authTypes = `
type User {
    _id: ID!
    username: String!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}
`;

const authRootQuery = `
    signin(username: String!, password: String!): AuthData!
`;

const authRootMutation = `
    signup(username: String!, password: String!): User
`;

exports.authTypes = authTypes;
exports.authRootQuery = authRootQuery;
exports.authRootMutation = authRootMutation;
