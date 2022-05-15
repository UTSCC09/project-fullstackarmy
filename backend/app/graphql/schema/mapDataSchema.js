const mapDataTypes = `
    type VaccMapData {
        isoCode: String
        isoCodeName: String
        peopleVaccinatedPerHundred: Float
    }

    type FullyVaccMapData {
        isoCode: String
        isoCodeName: String
        peopleFullyVaccinatedPerHundred: Float
    }

    type BoosterVaccMapData {
        isoCode: String
        isoCodeName: String
        totalBoostersPerHundred: Float
    }

    type VaccDistribMapData {
        isoCode: String
        isoCodeName: String
        dosesDeliveredRequiredPercent: Float
        dosesExpectedRequiredPercent: Float
    }
`;

const mapDataRootQuery = `
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
