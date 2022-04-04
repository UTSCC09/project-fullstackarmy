const mapDataTypes = `
    type VaccMapData {
        isoCode: String
        peopleVaccinatedPerHundred: Float
    }

    type FullyVaccMapData {
        isoCode: String
        peopleFullyVaccinatedPerHundred: Float
    }

    type BoosterVaccMapData {
        isoCode: String
        totalBoostersPerHundred: Float
    }

    type VaccDistribMapData {
        isoCode: String
        dosesDeliveredRequiredPercent: Float
        dosesExpectedRequiredPercent: Float
    }
`;

const mapDataRootQuery =`
    countryVaccMapData(startDate: String!, endDate: String!): [VaccMapData!]!
    countryFullyVaccMapData(startDate: String!, endDate: String!): [FullyVaccMapData!]!
    countryBoosterVaccMapData(startDate: String!, endDate: String!): [BoosterVaccMapData!]!
    continentVaccMapData(startDate: String!, endDate: String!): [VaccMapData!]!
    continentFullyVaccMapData(startDate: String!, endDate: String!): [FullyVaccMapData!]!
    continentBoosterVaccMapData(startDate: String!, endDate: String!): [BoosterVaccMapData!]!
    countryVaccDistribMapData: [VaccDistribMapData!]!
`;

const mapDataRootMutation = ``;

exports.mapDataTypes = mapDataTypes;
exports.mapDataRootQuery = mapDataRootQuery;
exports.mapDataRootMutation = mapDataRootMutation;