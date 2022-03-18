## DB Docs

### Tables

1. Country table

   - \_id
   - isoCode: string
   - countryName: string

   - unique: iso_code

2. Income group table

   - \_id
   - incomeGroup

   - unique: incomeGroup

3. Income to Country

   - \_id
   - year
   - incomeGroup: foreign key to `income`
   - isoCode: foreign key to `country`

   - unique: isoCode, year

4. Vaccination Data Table

   - \_id
   - date: date
   - totalVaccinations: int
   - peopleVaccinated: int
   - totalVaccinationsPerHundred: float
   - peopleVaccinatedPerHundred: float
   - isoCode: foreign key to `country`

   - unique: isoCode, date

5. Vaccination by Age

   - \_id
   - date: date
   - ageGroup: string
   - peopleVaccinatedPerHundred: float
   - peopleFullyVaccinatedPerHundred: float
   - peopleWithBoosterPerHundred: float
   - isoCode

   - unique: isoCode, date

## To run with proper env variables add:

```
MONGO_USER=\[mongo username\] MONGO_PASSWORD=\[mongo password\] MONGO_DB=\[mongo database\] node app.js
```
