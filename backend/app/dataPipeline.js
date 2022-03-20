const fetch = require('node-fetch');
const graphqlRequest = require('graphql-request');
const csvtojson = require('csvtojson');
const lodash = require('lodash');

// *** Gives isoCode a type to be stored in our DB
const world = "world";
const internationalAggregates = "internationalAggregates";
const continent = "continent";
const incomeLevel = "incomeLevel";
const subRegion = "subRegion";
const country = "country";

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

/** 
* Returns the isoCodeType based on the isoCode
* @summary Defaults to country if not found
* @param {String} isoCode
* @return {String} isoCodeToType
* @author Mohamed Tayeh
*/
const isoCodeToType = (isoCode) => {

  let type = isoCodeToTypes[isoCode];

  if (!type) return country;
  return type;
}

let isoCodesUpdatePayload;
let vaccDataPayload = [];

/** 
* Gets the datasets that are going to be used to fill the DB and transforms them
* @summary Aim is to create two payloads: for isoCodeData updates; for isoCodeVaccData updates
* by combining info from both datasets
* @author Mohamed Tayeh
*/
const getDataSets = async () => {

  const countryIncomeLevelData = await fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/scripts/input/wb/income_groups.csv');
  let csvData = await countryIncomeLevelData.text();
  
  csvtojson().fromString(csvData).then((jsonData) => {
    isoCodesUpdatePayload = jsonData.map(dataPoint => {
      return {
        "isoCode": dataPoint["Code"],
        "isoCodeName": dataPoint["Country"],
        "isoCodeType": isoCodeToType(dataPoint["Code"]),
        "incomeLevel": dataPoint["Income group"],
        "year": dataPoint["Year"],
      }
    });

  }).catch(err => {
    console.log(err);
  })

  const isoCodesVaccData = await fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json');
  let isoCodesVaccDataJSON = await isoCodesVaccData.json();
  let isoCodesUpdateData = [];

  isoCodesVaccDataJSON.forEach(isoCodeVaccData => {
    if (isoCodeToType(isoCodeVaccData["iso_code"]) != country) {
      isoCodesUpdateData.push({
        "isoCode": isoCodeVaccData["iso_code"],
        "isoCodeName": isoCodeVaccData["country"],
        "isoCodeType": isoCodeToType(isoCodeVaccData["iso_code"]),
      })
    }

    vaccDataPayload.push({
      "isoCode": isoCodeVaccData["iso_code"],
      "data": isoCodeVaccData["data"].map(dataEl => {
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
          peopleFullyVaccinated: dataEl["people_fully_vaccinated"],
          peopleFullyVaccinatedPerHundred: dataEl["people_fully_vaccinated_per_hundred"],
          totalBoosters: dataEl["total_boosters"],
          totalBoostersPerHundred: dataEl["total_boosters_per_hundred"]
        }
      })
    })
  })

  isoCodesUpdatePayload = isoCodesUpdatePayload.concat(isoCodesUpdateData);
}

// *** IsoCodeData updates
/** 
* Sends a request to updateIsoCodeData pipeline in the backend
* @param {IsoCodeDataInput} isoCodeDataInput 
* @return {Number} number of records created
* @note Small dataset therefore there is no need to perform batch requests
* @author Mohamed Tayeh
*/
const isoCodesUpdateReq = async (isoCodeDataInput) => {
  const graphQLClient = new graphqlRequest.GraphQLClient('http://localhost:3000/api');

  const query = graphqlRequest.gql`  
    mutation UpdateIsoCodeData($isoCodeDataInput: [IsoCodeDataInput!]!) {              
      updateIsoCodeData(isoCodeDataInput: $isoCodeDataInput) {
        number
      }
    }
  `;

  const variables = {
    isoCodeDataInput
  }

  return graphQLClient.request(query, variables);
}

// *** IsoCodeVaccData updates

/** 
* Makes a single request to upload isoCodeDataInput
* @param {IsoCodeVaccDataInput} isoCodeVaccDataInput
* @return {Number} number of records added
* @author Mohamed Tayeh
*/
const addIsoCodeVaccDataReq = async (isoCodeVaccDataInput) => {
  const graphQLClient = new graphqlRequest.GraphQLClient('http://localhost:3000/api');

  const query = graphqlRequest.gql`
    mutation UpdateIsoCodeVaccData($isoCodeVaccDataInput: [IsoCodeVaccDataInput!]!) {              
      updateIsoCodeVaccData(isoCodeVaccDataInput: $isoCodeVaccDataInput) {
        number
      }
    }
  `;

  const variables = {
    isoCodeVaccDataInput
  }

  return graphQLClient.request(query, variables);
}

/** 
* Uses addIsoCodeVaccDataReq to create batch requests to the backend
* @param {IsoCodeVaccDataInput} isoCodeVaccDataInput
* @return {Number} number of batch requests made
* @note Batches the requests manually
* @note No async here so that it doesn't return a promise but an array of promises
* @author Mohamed Tayeh
*/
const isoCodeVaccDataUpdateReq = (isoCodeVaccDataInput) => {

  let allQueries = [];
	const numRecordsPerReq = 200;

  records = 0;
  let index = 0;

  // Use deep copy otherwise there is a conflict with shallow vs deep copies
  let deepCopy = lodash.cloneDeep(isoCodeVaccDataInput);

	isoCodeVaccDataInput.forEach(oneIsoCodeVaccData => {
		const maxI = Math.ceil(oneIsoCodeVaccData.data.length / numRecordsPerReq);

		for (let i = 0; i < maxI; i++){
			let queryVariables = oneIsoCodeVaccData;
      
			queryVariables.data = deepCopy[index].data.slice(i*numRecordsPerReq, (i+1)*numRecordsPerReq);
      records = records + queryVariables.data.length;

      allQueries.push(addIsoCodeVaccDataReq(queryVariables));
		}

    index++;
  })

  let result = Promise.all(allQueries).then(allRes => {
    return allRes.length;
  }).catch(err => {
    console.log('addIsoCodeVaccData');
    console.log(err);
    throw err;
  })

  return result;
} 

const dataPipeline = async () => {
  await getDataSets();
  await isoCodesUpdateReq(isoCodesUpdatePayload);
  await isoCodeVaccDataUpdateReq(vaccDataPayload);
}

dataPipeline();