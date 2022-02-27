# Project Title: World Covid-19 Vaccination Tracker

## Team Name

FullStackARMy

## Team Members

- Aaren Chu
- Raha Gharadaghi
- Mohamed Tayeh

## Web Application Description

A simplified COVID-19 vaccination worldwide statistics dashboard. The website will leverage enhanced data visualization libraries to show case charts and figures of the data. The application will support search and filtering features that will allow the users to navigate the dashboard based on data for a specific timeframe or country. In addition, a user will be allowed to sign up and customize the dashboard based on personal preferences for charts configuration, colour schemes, and fonts. To support a larger user base, the application will provide multi-lingual support.

### Motivation

There are a few vaccination tracker dashboards on the web currently, however even someone who is experienced with data these dashboards can get overwhelming to fully understand and the story behind the facts and figures. The aim of the website is to create a dashboard that would simplify the vaccination story to people who are not experienced with reading a large amount of data at a time. In addition, to appeal to as many people as possible, multi-lingual support.

### Stories Narrated

To make it easy to digest, we will be creating a series of stories we wish to convey using simple figures, charts and maps.

1. What shares of population received the doses by countries/continents/world?
2. What are the rates of vaccination (/100 people) over time by income/countries/continents/world?
3. What does the vaccine distribution between countries/continents look like?

## Beta Version Key Features

- All charts:

1. What shares of population received the doses by countries/continents/world?

   - Stacked bar chart here good (1st/2nd doses) in addition to a toggle to show the shares of the booster shot if the user wishes
   - Have a breakdown by age in the stacked bar chart
   - Have a breakdown by income in the stacked bar chart - see [NYT tracker](https://www.nytimes.com/interactive/2021/world/covid-vaccinations-tracker.html)
   - Heat map is good

Note: the breakdowns are not easily digestable therefore need to think of a UI/UX Design that will allow to hide these breakdowns and show them when user wishes.

2. What are the rates of vaccination (/100 people) over time by income/countries/continents/world?

   - Time series with the different lines representing each group

3. Vaccine distribution?
   - Bar chart to show how many vaccines each country/continent/income group have
   - Bar chart to show how many vaccines were administered in each
   - Bar chart to show how many were donated by each country (/100 people doesn't matter here in the toggle)

- Translation of website
- Data retrieval and parsing
  - Sources:
    - [Our World in Data](https://github.com/owid/covid-19-data/tree/master/public/data/vaccinations)
- Data storage
- User signup/signin

## Final Version Key Features

- A way to change between World/Continent/Country statistics and have a comparison between country/continent and world statistic
- Configuration of Charts - choosing the countries/continents on the charts
- Language Configuration
- Time filtering
- Multiple filtering and configurations can be saved in a manner that the user can title and browse through later on

## Technology Stack

- M - Mongodb
- E - Express + graphQL
- R - React
- N - Node

## Top 5 Technical Challenges

1. Updating the data regularly from the github repo for world data
2. Deployment
3. Saving user configuration
4. Researching and using translation libraries for multilingual support
5. UI/UX - chart organization and simplicity for accessibility and understanding
