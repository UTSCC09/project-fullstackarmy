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

There are a few vaccination tracker dashboards on the web currently, however even as someone with experience in data these dashboards can get overwhelming to fully understand the data and the story behind. The aim of the website to create a dashboard that would simplify the vaccination story to people are not experienced with reading a large amount of data at a time. In addition, to appeal to as many people as possible, multi-lingual support.

## Beta Version Key Features
- Some of the charts such as:
    - Percentage of people partially vaccinated per country
    - Percentage of people fully vaccinated per country
    - Comparison of highest percentages of fully vaccinated countries
    - Comparison of lowest percentages of fully vaccinated countries
- Translation of website
- Data retrieval and parsing
    - Sources:
        - [Our World in Data](https://github.com/owid/covid-19-data/tree/master/public/data/vaccinations)
- Data storage
- User signup/signin

## Final Version Key Features
- All charts:
    - Percentage of people partially vaccinated per country
    - Percentage of people fully vaccinated per country
    - Top vaccine brands per country
    - Comparison of highest percentages of fully vaccinated countries
    - Comparison of lowest percentages of fully vaccinated countries
    - Vaccination rates by country income level
    See [NYT tracker](https://www.nytimes.com/interactive/2021/world/covid-vaccinations-tracker.html)
- Configuration of Charts
- Language Configuration
- Search and filtering

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
5. UI/UX - chart organization and simplicity for accessibility 
