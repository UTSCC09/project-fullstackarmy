const dataPipelineTypes = `
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
    dailyVaccinationsRaw: Float
    dailyVaccinations: Float
    dailyVaccinationsPerMillion: Float
    dailyPeopleVaccinated: Float
    dailyPeopleVaccinatedPerHundred: Float
    peopleFullyVaccinated: Float
    peopleFullyVaccinatedPerHundred: Float
    totalBoosters: Float
    totalBoostersPerHundred: Float
}

input IsoCodeVaccDataInput {
    isoCode: String!
    data: [DailyVaccDataInput!]!
}

input IsoCodeVaccSupplyDataInput {
    isoCode: String!
    dosesRequiredFor85: Float
    dosesExpected: Float
    dosesDelivered: Float
    dosesDeliveredExpectedPercent: Float
    dosesDeliveredRequiredPercent: Float
    dosesExpectedRequiredPercent: Float
}

input DataPipelineLogsInput {
    date: String!
    pipelineName: String!
    successStatus: Boolean!
    recordsSent: Int!
    recordsSuccessfullyAdded: Int!
}
`;

const dataPipelineRootQuery =`
`;

const dataPipelineRootMutation = `
updateIsoCodeData(isoCodeDataInput: [IsoCodeDataInput]): Number!
updateIsoCodeVaccData(isoCodeVaccDataInput: [IsoCodeVaccDataInput]): Number!
updateIsoCodeVaccSupplyData(isoCodeVaccSupplyDataInput: [IsoCodeVaccSupplyDataInput]): Number!
updateDataPipelineLogs(dataPipelineLogsInput: DataPipelineLogsInput!): Bool!
`;

exports.dataPipelineTypes = dataPipelineTypes;
exports.dataPipelineRootQuery = dataPipelineRootQuery;
exports.dataPipelineRootMutation = dataPipelineRootMutation;