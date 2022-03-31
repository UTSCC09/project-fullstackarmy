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
`;

const mapDataRootQuery =`
    countryVaccMapData(startDate: String!, endDate: String!): [VaccMapData!]!
    countryFullyVaccMapData(startDate: String!, endDate: String!): [FullyVaccMapData!]!
    countryBoosterVaccMapData(startDate: String!, endDate: String!): [BoosterVaccMapData!]!
    continentVaccMapData(startDate: String!, endDate: String!): [VaccMapData!]!
    continentFullyVaccMapData(startDate: String!, endDate: String!): [FullyVaccMapData!]!
    continentBoosterVaccMapData(startDate: String!, endDate: String!): [BoosterVaccMapData!]!
`;

const mapDataRootMutation = ``;

exports.mapDataTypes = mapDataTypes;
exports.mapDataRootQuery = mapDataRootQuery;
exports.mapDataRootMutation = mapDataRootMutation;