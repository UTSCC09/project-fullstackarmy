const fetch = require('node-fetch');
const csvtojson = require('csvtojson')
const fs = require('fs');

const vaccinationData = async () => {
    const response = await fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json');
    let jsonData = await response.json();
    fs.writeFileSync('vaccinationData.json', JSON.stringify(jsonData, null, 4));
}

const vaccinationsByAge = async () => {
    const response = await fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations-by-age-group.csv');
    let csvData = await response.text();

    csvtojson().fromString(csvData).then((jsonData) => {
        fs.writeFileSync('vaccinationsByAge.json', JSON.stringify(jsonData, null, 4));
    });
}

const countryIncomeLevel = async () => {
    const response = await fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/scripts/input/wb/income_groups.csv');
    let csvData = await response.text();

    csvtojson().fromString(csvData).then((jsonData) => {
        fs.writeFileSync('countryIncomeLevel.json', JSON.stringify(jsonData, null, 4));
    });
}

// Extra
const vaccinationsByManufacturer = async () => {
    const response = await fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations-by-manufacturer.csv');
    let csvData = await response.text();

    csvtojson().fromString(csvData).then((jsonData) => {
        fs.writeFileSync('vaccinationsByManufacturer.json', JSON.stringify(jsonData, null, 4));
    });
}

vaccinationData();
vaccinationsByAge();
countryIncomeLevel();
vaccinationsByManufacturer();