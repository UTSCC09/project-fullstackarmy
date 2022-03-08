## DB Docs

### Tables

1. Country table

   - iso_code: string
   - country_name: string
   - pk: iso_code

2. Income group table

   - Income Group
   - Year
   - iso_code
   - pk: iso_code, year

3. Vaccination Data Table

   - date: date
   - total_vaccinations: int
   - people_vaccinated: int
   - total_vaccinations_per_hundred: float
   - people_vaccinated_per_hundred: float
   - iso_code
   - pk: iso_code, date

4. Vaccination by Age

   - date: date
   - age_group: string
   - people_vaccinated_per_hundred: float
   - people_fully_vaccinated_per_hundred: float
   - people_with_booster_per_hundred: float
   - iso_code
   - pk: iso_code, date

## To run with proper env variables add:
MONGO_USER=\[mongo username\] MONGO_PASSWORD=\[mongo password\] MONGO_DB=\[mongo database\] node app.js