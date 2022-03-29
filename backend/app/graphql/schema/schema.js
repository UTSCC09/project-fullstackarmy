const { buildSchema } = require('graphql');
const {dataPipelineTypes, dataPipelineRootQuery, dataPipelineRootMutation} = require('./dataPipelineSchema');
const {globalTypes} = require('./globalTypes');

module.exports = buildSchema(`
${globalTypes}

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

type CountryVaccMapData {
    isoCode: String
    peopleVaccinatedPerHundred: Float
}

type CountryFullyVaccMapData {
    isoCode: String
    peopleFullyVaccinatedPerHundred: Float
}

type CountryBoosterVaccMapData {
    isoCode: String
    totalBoostersPerHundred: Float
}

input isoCodeInput {
    isoCode: String!
    isoCodeName: String!
}

${dataPipelineTypes}

type RootQuery {
    isoCodes(isoCodes:[String!]!): [IsoCode!]!
    getMostRecentFirstVaccDataByIsoCode(isoCodes:[String!]!): [DailyVaccData!]
    getMostRecentFullyVaccDataByIsoCode(isoCodes:[String!]!): [DailyVaccData!]
    getMostRecentBoosterVaccDataByIsoCode(isoCodes:[String!]!): [DailyVaccData!]
    getVaccDataByDateRangeAndIsoCode(startDate: String!, endDate: String!, isoCodes: [String!]!): [[DailyVaccData!]!]
    countryVaccMapData(startDate: String!, endDate: String!): [CountryVaccMapData!]!
    countryFullyVaccMapData(startDate: String!, endDate: String!): [CountryFullyVaccMapData!]!
    countryBoosterVaccMapData(startDate: String!, endDate: String!): [CountryBoosterVaccMapData!]!
    ${dataPipelineRootQuery}
}

type RootMutation {
    ${dataPipelineRootMutation}
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);