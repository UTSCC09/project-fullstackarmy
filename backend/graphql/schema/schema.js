const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Number {
    number: Int!
}
type IsoCode {
    _id: ID!
    isoCode: String!
    isoCodeName: String!
    isoCodeType: IsoCodeType!
}
type IsoCodeType {
    isoCodeType: String!
}
type DailyVaccData {
    isoCode: IsoCode!
    date: String!
    totalVaccinations: Float
    totalVaccinationsPerHundred: Float
    peopleVaccinated: Float
    peopleVaccinatedPerHundred: Float
    peopleFullyVaccinatedPerHundred: Float
    dailyVaccinationsRaw: Float
    dailyVaccinations: Float
    dailyVaccinationsPerMillion: Float
    dailyPeopleVaccinated: Float
    dailyPeopleVaccinatedPerHundred: Float
    totalBoosters: Float
    totalBoostersPerHundred: Float
}
input isoCodeInput {
    isoCode: String!
    isoCodeName: String!
}
input IsoCodeDataInput {
    isoCode: String!
    isoCodeName: String!
    isoCodeType: String!
    year: String
    incomeLevel: String
}
input DailyVaccDataInput {
    date: String!
    totalVaccinations: Float
    totalVaccinationsPerHundred: Float
    peopleVaccinated: Float
    peopleVaccinatedPerHundred: Float
    peopleFullyVaccinatedPerHundred: Float
    dailyVaccinationsRaw: Float
    dailyVaccinations: Float
    dailyVaccinationsPerMillion: Float
    dailyPeopleVaccinated: Float
    dailyPeopleVaccinatedPerHundred: Float
    totalBoosters: Float
    totalBoostersPerHundred: Float
}
input IsoCodeVaccDataInput {
    isoCode: String!
    data: [DailyVaccDataInput!]!
}
type RootQuery {
    isoCodes(isoCodes:[String!]!): [IsoCode!]!
    getMostRecentVaccDataByIsoCode(isoCodes:[String!]!): [DailyVaccData!]
    getVaccDataByDateRangeAndIsoCode(startDate: String!, endDate: String!, isoCodes: [String!]!): [DailyVaccData!]!
}
type RootMutation {
    updateIsoCodeData(isoCodeDataInput: [IsoCodeDataInput]): Number!
    updateIsoCodeVaccData(isoCodeVaccDataInput: [IsoCodeVaccDataInput]): Number!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);