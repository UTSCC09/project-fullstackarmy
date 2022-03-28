const fetch = require('node-fetch');
const IsoCodesVaccDataURL = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json';
const fs = require('fs');

let c = 0;
let vaccDataPayload = []

const test = async () => {
  const isoCodesVaccData = await fetch(IsoCodesVaccDataURL);
  let isoCodesVaccDataJSON = await isoCodesVaccData.json();
  
  isoCodesVaccDataJSON.forEach(isoCodeVaccData => { 
    let isoCode = isoCodeVaccData["iso_code"];
    let data = [];
  
    isoCodeVaccData["data"].forEach(dataEl => {
      c++;
  
      // Get current data
      let date = dataEl["date"];
  
      let totalVaccinations = dataEl["total_vaccinations"];
      let totalVaccinationsPerHundred = dataEl["total_vaccinations_per_hundred"];
      let peopleVaccinated = dataEl["people_vaccinated"];
      let peopleVaccinatedPerHundred = dataEl["people_vaccinated_per_hundred"];
      let dailyVaccinationsRaw = dataEl["daily_vaccinations_raw"];
      let dailyVaccinations = dataEl["daily_vaccinations"];
      let dailyVaccinationsPerMillion = dataEl["daily_vaccinations_per_million"];
      let dailyPeopleVaccinated = dataEl["daily_people_vaccinated"];
      let dailyPeopleVaccinatedPerHundred = dataEl["daily_people_vaccinated_per_hundred"];
      let peopleFullyVaccinated = dataEl["people_fully_vaccinated"];
      let peopleFullyVaccinatedPerHundred = dataEl["people_fully_vaccinated_per_hundred"];
      let totalBoosters = dataEl["total_boosters"];
      let totalBoostersPerHundred = dataEl["total_boosters_per_hundred"];
  
      let newData = {
        totalVaccinations,
        totalVaccinationsPerHundred,
        peopleVaccinated,
        peopleVaccinatedPerHundred,
        dailyVaccinationsRaw,
        dailyVaccinations,
        dailyVaccinationsPerMillion,
        dailyPeopleVaccinated,
        dailyPeopleVaccinatedPerHundred,
        peopleFullyVaccinated,
        peopleFullyVaccinatedPerHundred,
        totalBoosters,
        totalBoostersPerHundred,
      }
        
      data.push({
        date,
        ...newData
      })
    })
  
    vaccDataPayload.push({
      isoCode,
      data
    })
  })

  console.log(c);
}

// test();

let data = JSON.parse(fs.readFileSync('./VaccData.txt'));

console.log(Object.keys(data).length);