const fetch = require('node-fetch');

/**
 * How to get the raw content of a github data url:
 * 1. replace 'github.com' with 'raw.githubusercontent.com'
 * 2. remove '/blob'
 */

const vaccinationData = async () => {
    const response = await fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json');
    let data = await response.json();
    console.log(data);
}

const vaccinationsByAge = async () => {
    const response = await fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations-by-age-group.csv');
    let data = await response.text();
    console.log(data);
}

const countryIncomeLevel = async () => {
    const response = await fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/scripts/input/wb/income_groups.csv');
    let data = await response.text();
    console.log(data);
}

// Extra
const vaccinationsByManufacturer = async () => {
    const response = await fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations-by-manufacturer.csv');
    let data = await response.text();
    console.log(data);
}

// vaccinationData();
// vaccinationsByAge();
// countryIncomeLevel();
// vaccinationsByManufacturer();