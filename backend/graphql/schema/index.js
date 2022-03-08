const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Country {
    _id: ID!
    iso_code: String!
    country_name: String!
}
type CountryIncomeGroup {
    _id: ID!
    iso_code: String!
    year: String!
    income_group: String!
}
type VaccinationDataPerCountry {
    _id: ID!
    iso_code: String!
    date: String!
    total_vaccinations: Integer!,
    people_vaccinated: Integer!,
    total_vaccinations_per_hundred: Float!,
    people_vaccinated_per_hundred: Float!
}
type VaccinationsByAge {
    _id: ID!
    iso_code: String!
    date: String!
    age_group: String!,
    people_vaccinated_per_hundred: Float!,
    people_fully_vaccinated_per_hundred: Float!
    people_with_booster_per_hundred: Float!
}
input CountryInput {
    iso_code: String!
    country_name: String!
}
input CountryIncomeLevelInput {
    iso_code: String!
    year: String!
    income_group: String!
}
input VaccinationDataPerCountry {
    iso_code: String!
    date: String!
    total_vaccinations: Integer!,
    people_vaccinated: Integer!,
    total_vaccinations_per_hundred: Float!,
    people_vaccinated_per_hundred: Float!
}
input VaccinationsByAgeInput {
    iso_code: String!
    date: String!
    age_group: String!,
    people_vaccinated_per_hundred: Float!,
    people_fully_vaccinated_per_hundred: Float!
    people_with_booster_per_hundred: Float!
}
type RootQuery {
    countries: [Country!]!
    getCountryById(countryId: ID!): Country!
    getCountryByISOCode(iso_code: String!): Country!
    getCountryIncomeLevelByKey(iso_code: String!, year: String!): Country!
    getVaccinationDataPerCountry(iso_code:String!, date:String!): VaccinationDataPerCountry!
    getVaccinationsByAgePerCountry(iso_code:String!, date:String!): VaccinationsByAge!
}
type RootMutation {
    addCountry(countryInput: CountryInput): Country
    addCountryIncomeLevel(countryIncomeLevelInput: CountryIncomeLevelInput): User
    addVaccinationDataPerCountry(vaccinationDataPerCountryInput: VaccinationDataPerCountryInput): VaccinationData
    addVaccinationsByAge(vaccinationsByAgeInput: VaccinationsByAgeInput): VaccinationsByAge
    deleteCountry(countryId: ID!): Country
    deleteCountryIncomeLevel(countryIncomeLevelId: ID!): CountryIncomeLevel
    deleteVaccinationDataPerCountry(VaccinationDataPerCountryId: ID!): VaccinationDataPerCountry
    deleteVaccinationsByAge(vaccinationsByAgeId: ID!): VaccinationsByAge
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);