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
    msg: String
}
`;

const dataPipelineRootQuery = `
`;

const dataPipelineRootMutation = `
updateIsoCodeData(isoCodeDataInput: [IsoCodeDataInput], username: String!): Number!
updateIsoCodeVaccData(isoCodeVaccDataInput: [IsoCodeVaccDataInput], username: String!): Number!
updateIsoCodeVaccSupplyData(isoCodeVaccSupplyDataInput: [IsoCodeVaccSupplyDataInput], username: String!): Number!
updateDataPipelineLogs(dataPipelineLogsInput: DataPipelineLogsInput!, username: String!): Bool!
`;

exports.dataPipelineTypes = dataPipelineTypes;
exports.dataPipelineRootQuery = dataPipelineRootQuery;
exports.dataPipelineRootMutation = dataPipelineRootMutation;
