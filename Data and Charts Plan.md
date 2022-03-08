# Data & Charts Plan

### Stories Narrated

1. What shares of population received the doses by countries/continents/world?
2. What are the rates of vaccination (/100 people) over time by income/countries/continents/world?
3. What does the vaccine distribution between countries/continents look like?

### Who will be using this?

When will we reach heard immunation?

why are some ages

critical time markers for the vaccination rates
when new variates came out

### Chart Data & Configuration

1. What shares of population received the doses by countries/continents/world?

   - Stacked bar chart here good (1st/2nd doses) in addition to a toggle to show the shares of the booster shot if the user wishes

     - Chart configuration:
       1. If just the world it should be a pie chart
       2. If it is a comparison between multiple countries it should be a stacked bar chart
     - Data needed:
       1. Total population data to determine percentages for country/continent/world - source: TBA
       2. Vaccination numbers for country/continent/world - source: [OWID Vaccination](https://github.com/owid/covid-19-data/tree/master/public/data/vaccinations)

   - Have a breakdown by age in the stacked bar chart

     - Data needed:
       1. Each country's breakdown based on age - source [OWID Age](https://github.com/owid/covid-19-data/blob/master/public/data/vaccinations/vaccinations-by-age-group.csv)

   - Have a breakdown by income in the stacked bar chart

     - Data needed:
       1. Each country income classification - source: [OWID Income](https://github.com/owid/covid-19-data/blob/master/scripts/input/wb/income_groups.csv)

   - Heat map is good:
     - Data needed:
       1. Locations of borders of each country - source: TBA when we reach that point, in addition turns out that the google maps API has costs associated with it.

Note: the breakdowns are not easily digestable therefore need to think of a UI/UX Design that will allow to hide these breakdowns and show them when user wishes.

2. What are the rates of vaccination (/100 people) over time by income/countries/continents/world?

   - Time series with the different lines representing each group
     - Data needed:
       1. Vaccination rate /100 is already obtained in the OWID Vaccination data for each of countries/continents/world and countries can be combined by income

3. Vaccine distribution?

   - ~~Bar chart to show how many vaccines each country/continent/income group have~~ **not needed since it doesn't matter**
   - Bar chart to show how many vaccines were administered in each
     - Data needed:
       1. Vaccinations administered data - source [OWID Vaccinations](https://github.com/owid/covid-19-data/tree/master/public/data/vaccinations)
   - Bar chart to show how many were donated by each country
     - Data needed:
       1. Vaccine donations - source: [COVID19 Task Force](https://data.covid19taskforce.com/data/tables)
