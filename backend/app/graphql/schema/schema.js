const { buildSchema } = require('graphql');
const { mapDataTypes, mapDataRootQuery } = require('./mapDataSchema');
const {
  dataPipelineTypes,
  dataPipelineRootQuery,
  dataPipelineRootMutation,
} = require('./dataPipelineSchema');
const {
  userConfigTypes,
  userConfigRootQuery,
  userConfigRootMutation,
} = require('./userConfigSchema');
const {
  authTypes,
  authRootQuery,
  authRootMutation,
} = require('./authorizationSchema');
const { globalTypes } = require('./globalTypes');

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

type VaccSupplyData {
    isoCode: IsoCode!
    dosesDeliveredRequiredPercent: Float
    dosesExpectedRequiredPercent: Float
}

input isoCodeInput {
    isoCode: String!
    isoCodeName: String!
}

${mapDataTypes}
${dataPipelineTypes}
${authTypes}
type RootQuery {
    isoCodes(isoCodes:[String!]!): [IsoCode!]!
    countryIsoCodes: [IsoCode!]!
    getMostRecentFirstVaccDataByIsoCode(isoCodes:[String!]!): [DailyVaccData!]
    getMostRecentFullyVaccDataByIsoCode(isoCodes:[String!]!): [DailyVaccData!]
    getMostRecentBoosterVaccDataByIsoCode(isoCodes:[String!]!): [DailyVaccData!]
    getVaccDataByDateRangeAndIsoCode(startDate: String!, endDate: String!, isoCodes: [String!]!): [[DailyVaccData!]!]
    getFirstVaccDataByDateRangeAndIsoCode(startDate: String!, endDate: String!, isoCodes: [String!]!): [DailyVaccData!]
    getFullyVaccDataByDateRangeAndIsoCode(startDate: String!, endDate: String!, isoCodes: [String!]!): [DailyVaccData!]
    getBoosterVaccDataByDateRangeAndIsoCode(startDate: String!, endDate: String!, isoCodes: [String!]!): [DailyVaccData!]
    getSupplyDataByIsoCode(isoCodes:[String!]!): [VaccSupplyData!]
    ${mapDataRootQuery}
    ${dataPipelineRootQuery}
    ${authRootQuery}
}

type RootMutation {
    ${dataPipelineRootMutation}
    ${authRootMutation}
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
