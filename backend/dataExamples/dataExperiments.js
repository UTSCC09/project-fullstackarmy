const vaccinationData = require('./vaccinationData.json');
const fs = require('fs');

let isoCodes = vaccinationData.filter(country => country.iso_code.startsWith('OWID')).map(country => {
    return {isoCode: country.iso_code, countrName: country.country}
});
fs.writeFileSync('./isoCodes.json', JSON.stringify(isoCodes, null, 4));

const world = "world";
const internationalAggregates = "internationalAggregates";
const continent = "continent";
const incomeLevel = "incomeLevel";
const subRegion = "subRegion";
const country = "country";

const isoCodeTypes = [
    world,
    internationalAggregates,
    continent,
    incomeLevel,
    subRegion,
]

const isoCodeToTypes = {
    "OWID_WRL": world,
    "OWID_EUN": internationalAggregates,
    "OWID_AFR": continent,
    "OWID_ASI": continent,
    "OWID_EUR": continent,
    "OWID_NAM": continent,
    "OWID_OCE": continent,
    "OWID_SAM": continent,
    "OWID_HIC": incomeLevel,
    "OWID_LIC": incomeLevel,
    "OWID_LMC": incomeLevel,
    "OWID_UMC": incomeLevel,
    "OWID_ENG": subRegion,
    "OWID_CYN": subRegion,
    "OWID_NIR": subRegion,
    "OWID_SCT": subRegion,
    "OWID_WLS": subRegion
}

const isoCodeToType = (isoCode) => {

    let type = isoCodeToTypes[isoCode];

    if (!type) return country;
    return type;
}

let jsonData = vaccinationData.map(dataPoint => {
    return {
        "countryName": dataPoint["country"],
        "isoCode": dataPoint["iso_code"],
        "isoCodeType": isoCodeToType(dataPoint["iso_code"]),
        "data": dataPoint["data"].map(dataEl => {
          return {
                date: dataEl["date"],
                totalVaccinations: dataEl["total_vaccinations"],
                totalVaccinationsPerHundred: dataEl["total_vaccinations_per_hundred"],
                peopleVaccinated: dataEl["people_vaccinated"],
                peopleVaccinatedPerHundred: dataEl["people_vaccinated_per_hundred"],
                dailyVaccinationsRaw: dataEl["daily_vaccinations_raw"],
                dailyVaccinations: dataEl["daily_vaccinations"],
                dailyVaccinationsPerMillion: dataEl["daily_vaccinations_per_million"],
                dailyPeopleVaccinated: dataEl["daily_people_vaccinated"],
                dailyPeopleVaccinatedPerHundred: dataEl["daily_people_vaccinated_per_hundred"],
                totalBoosters: dataEl["total_boosters"],
                totalBoostersPerHundred: dataEl["total_boosters_per_hundred"]
            }
        }),
    }
});

fs.writeFileSync('./vaccinationDataParams.json', JSON.stringify(jsonData, null, 4));