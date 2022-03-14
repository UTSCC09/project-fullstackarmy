const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Number {
    number: Int!
}

type IsoCode {
    _id: ID!
    isoCode: String!
    isoCodeName: String!
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
    isoCode: [IsoCode!]!
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


// ! Exentive list of types
// `
// type CountryIncomeGroup {
//     _id: ID!
//     country: Country!
//     year: String!
//     income_group: String!
// }

// type VaccinationDataPerCountry {
//     _id: ID!
//     iso_code: String!
//     date: String!
//     total_vaccinations: Int!,
//     people_vaccinated: Int!,
//     total_vaccinations_per_hundred: Float!,
//     people_vaccinated_per_hundred: Float!
// }

// type VaccinationsByAge {
//     _id: ID!
//     iso_code: String!
//     date: String!
//     age_group: String!,
//     people_vaccinated_per_hundred: Float!,
//     people_fully_vaccinated_per_hundred: Float!
//     people_with_booster_per_hundred: Float!
// }
// `

// ! Extensive List of inputs
// `
// input CountryIncomeLevelInput {
//     year: String!
//     income_group: String!
//     country: Country!
// }

// input VaccinationDataPerCountryInput {
//     iso_code: String!
//     date: String!
//     total_vaccinations: Int!,
//     people_vaccinated: Int!,
//     total_vaccinations_per_hundred: Float!,
//     people_vaccinated_per_hundred: Float!
// }

// input VaccinationsByAgeInput {
//     iso_code: String!
//     date: String!
//     age_group: String!,
//     people_vaccinated_per_hundred: Float!,
//     people_fully_vaccinated_per_hundred: Float!
//     people_with_booster_per_hundred: Float!
// }
// `

// ! Exenstive List of API's - was breaking so moved them outside and added the ones I needed for now
// `
// type RootQuery {
//     countries: [Country!]!
//     getCountryById(countryId: ID!): Country!
//     getCountryByISOCode(iso_code: String!): Country!
//     getCountryIncomeLevelByKey(iso_code: String!, year: String!): Country!
//     getVaccinationDataPerCountry(iso_code:String!, date:String!): VaccinationDataPerCountry!
//     getVaccinationsByAgePerCountry(iso_code:String!, date:String!): VaccinationsByAge!
// }

// type RootMutation {
//     addCountry(countryInput: CountryInput): Country
//     addCountryIncomeLevel(countryIncomeLevelInput: CountryIncomeLevelInput): User
//     addVaccinationDataPerCountry(vaccinationDataPerCountryInput: VaccinationDataPerCountryInput): VaccinationData
//     addVaccinationsByAge(vaccinationsByAgeInput: VaccinationsByAgeInput): VaccinationsByAge
//     deleteCountry(countryId: ID!): Country
//     deleteCountryIncomeLevel(countryIncomeLevelId: ID!): CountryIncomeLevel
//     deleteVaccinationDataPerCountry(VaccinationDataPerCountryId: ID!): VaccinationDataPerCountry
//     deleteVaccinationsByAge(vaccinationsByAgeId: ID!): VaccinationsByAge
// }
// `