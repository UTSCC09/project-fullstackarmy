const fetch = require('node-fetch');
const graphqlRequest = require('graphql-request');
const csvtojson = require('csvtojson');
const lodash = require('lodash');
const constants = require('./dataPipelineConstants');
const helpers = require('./dataPipelineHelpers');
const fs = require('fs');
const { CronJob } = require('cron');

const graphQLClient = new graphqlRequest.GraphQLClient('http://localhost:3000/api');

const CountryIncomeLevelDataURL = 'https://raw.githubusercontent.com/owid/covid-19-data/master/scripts/input/wb/income_groups.csv';
const IsoCodesVaccDataURL = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json';

const StoredIsoCodeData = 'IsoCodeData.txt';
const StoredVaccData = 'VaccData.txt';

const VaccDataPipelineName = 'vacDataPipelineName';
const VaccDataPipelineTxt = 'vacDataPipelineLogs.txt';

let isoCodesUpdatePayload = [];
let vaccDataPayload = [];

// Set up key value pair dict to store the data so that data checks can be done
// efficiently
// Get the previous data sent to backend
let prevDataIsoCodeData;
let prevDataVaccData;

/** 
* FS call back in case of error
* @param {NodeJS.ErrnoException} err 
* @return {NodeJS.ErrnoException | null} the error or null
*/
const errCallback = (err) => {
  if (err) {
    helpers.updateDataPipelineLogs(VaccDataPipelineName, false, 0, 0, err.message);
    helpers.updateDataPipelineTxt(VaccDataPipelineTxt, false, 0, 0, err.message);
  }
  return null;
}

/** 
* Gets the datasets that are going to be used to fill the DB and transforms them
* @summary Aim is to create two payloads: for isoCodeData updates; for isoCodeVaccData updates
* by combining info from both datasets
* @author Mohamed Tayeh
*/
const getDataSets = async () => {
  try {
    // Done synchronously since it is needed in the rest of the function
    prevDataIsoCodeData = JSON.parse(fs.readFileSync(StoredIsoCodeData));
    prevDataVaccData = JSON.parse(fs.readFileSync(StoredVaccData));
  } catch (err) {
    // This will only occur when there is no file which occurs only when
    // when the script is first run, therefore do nothing
    prevDataIsoCodeData = {};
    prevDataVaccData = {};
  }

  // To avoid adding duplicates in the isoCodes obtained
  // from the vaccination data
  let isoCodesAlreadyInPayload = [];

  const countryIncomeLevelData = await fetch(CountryIncomeLevelDataURL);
  let csvData = await countryIncomeLevelData.text();
  
  await csvtojson().fromString(csvData).then((jsonData) => {
    jsonData.forEach(dataPoint => {

      // Get current data
      let isoCode = dataPoint["Code"];
      let isoCodeName = dataPoint["Country"];
      let isoCodeType = helpers.isoCodeToType(dataPoint["Code"]);
      let incomeLevel = dataPoint["Income group"];
      let year = dataPoint["Year"];

      // Check if same as previous data
      let prevDataRow = prevDataIsoCodeData[isoCode];
      
      // Newly added isoCode
      if (prevDataRow) {        
        let cond1 = prevDataRow.isoCodeName === isoCodeName;
        let cond2 = prevDataRow.isoCodeType === isoCodeType;
        let cond3 = prevDataRow.incomeLevel === incomeLevel;
        let cond4 = prevDataRow.year === year;

        if (cond1 && cond2 && cond3 && cond4) return;
      }

      let newData = {
        isoCodeName, 
        isoCodeType, 
        incomeLevel,
        year, 
      }

      prevDataIsoCodeData[isoCode] = newData;

      isoCodesUpdatePayload.push({
        ...newData,
        isoCode
      });

      isoCodesAlreadyInPayload.push(isoCode);
    });
  }).catch(err => {
    console.log(err);
  })

  const isoCodesVaccData = await fetch(IsoCodesVaccDataURL);
  let isoCodesVaccDataJSON = await isoCodesVaccData.json();
  
  isoCodesVaccDataJSON.forEach(isoCodeVaccData => {
    
    let isoCode = isoCodeVaccData["iso_code"];
    
    // Add all the isoCodes that are not in the incomeLevel dataset
    if (isoCodesAlreadyInPayload.indexOf(isoCode) == -1) {

      let isoCodeName = isoCodeVaccData["country"];
      let isoCodeType = helpers.isoCodeToType(isoCode);

      let newData = {
        isoCodeName, 
        isoCodeType, 
      };

      // Check if same as previous data (conds are different)
      let prevDataRow = prevDataIsoCodeData[isoCode];
      
      // Previously added isoCode
      if (prevDataRow) {
        let cond1 = prevDataRow.isoCodeName === isoCodeName;
        let cond2 = prevDataRow.isoCodeType === isoCodeType;

        if (cond1 && cond2) return;
      }

      prevDataIsoCodeData[isoCode] = newData;
      isoCodesUpdatePayload.push({
        ...newData,
        isoCode
      });
    }

    let data = [];

    isoCodeVaccData["data"].forEach(dataEl => {

      // Get current data
      let date = dataEl["date"];

      let totalVaccinations = helpers.modifiedParseFloat(dataEl["total_vaccinations"]);
      let totalVaccinationsPerHundred = helpers.modifiedParseFloat(dataEl["total_vaccinations_per_hundred"]);
      let peopleVaccinated = helpers.modifiedParseFloat(dataEl["people_vaccinated"]);
      let peopleVaccinatedPerHundred = helpers.modifiedParseFloat(dataEl["people_vaccinated_per_hundred"]);
      let dailyVaccinationsRaw = helpers.modifiedParseFloat(dataEl["daily_vaccinations_raw"]);
      let dailyVaccinations = helpers.modifiedParseFloat(dataEl["daily_vaccinations"]);
      let dailyVaccinationsPerMillion = helpers.modifiedParseFloat(dataEl["daily_vaccinations_per_million"]);
      let dailyPeopleVaccinated = helpers.modifiedParseFloat(dataEl["daily_people_vaccinated"]);
      let dailyPeopleVaccinatedPerHundred = helpers.modifiedParseFloat(dataEl["daily_people_vaccinated_per_hundred"]);
      let peopleFullyVaccinated = helpers.modifiedParseFloat(dataEl["people_fully_vaccinated"]);
      let peopleFullyVaccinatedPerHundred = helpers.modifiedParseFloat(dataEl["people_fully_vaccinated_per_hundred"]);
      let totalBoosters = helpers.modifiedParseFloat(dataEl["total_boosters"]);
      let totalBoostersPerHundred = helpers.modifiedParseFloat(dataEl["total_boosters_per_hundred"]);

      // Make the data key
      let vaccDataKey = isoCode.concat(date);

      // Check if same as previous data
      let prevDataRow = prevDataVaccData[vaccDataKey];

      // Newly added isoCode
      if (prevDataRow) {
        // ? Not sure if there is a better to code these conditions
        let cond1 = totalVaccinations === prevDataRow['totalVaccinations'];
        let cond2 = totalVaccinationsPerHundred === prevDataRow['totalVaccinationsPerHundred'];
        let cond3 = peopleVaccinated === prevDataRow['peopleVaccinated'];
        let cond4 = peopleVaccinatedPerHundred === prevDataRow['peopleVaccinatedPerHundred'];
        let cond5 = dailyVaccinationsRaw === prevDataRow['dailyVaccinationsRaw'];
        let cond6 = dailyVaccinations === prevDataRow['dailyVaccinations'];
        let cond7 = dailyVaccinationsPerMillion === prevDataRow['dailyVaccinationsPerMillion'];
        let cond8 = dailyPeopleVaccinated === prevDataRow['dailyPeopleVaccinated'];
        let cond9 = dailyPeopleVaccinatedPerHundred === prevDataRow['dailyPeopleVaccinatedPerHundred'];
        let cond10 = peopleFullyVaccinated === prevDataRow['peopleFullyVaccinated'];
        let cond11 = peopleFullyVaccinatedPerHundred === prevDataRow['peopleFullyVaccinatedPerHundred'];
        let cond12 = totalBoosters === prevDataRow['totalBoosters'];
        let cond13 = totalBoostersPerHundred === prevDataRow['totalBoostersPerHundred'];
        
        let finalCond = cond1 && cond2 && cond3 && cond4 && cond5
          && cond6 && cond7 && cond8 && cond9 && cond10 && cond11
          cond12 && cond13;

        if (finalCond) return;
      }

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

      prevDataVaccData[vaccDataKey] = newData;
      
      data.push({
        date,
        ...newData
      })
    });

    vaccDataPayload.push({
      isoCode,
      data
    });
  });

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
  
  const query = graphqlRequest.gql`  
    mutation UpdateIsoCodeData($isoCodeDataInput: [IsoCodeDataInput]) {              
      updateIsoCodeData(isoCodeDataInput: $isoCodeDataInput) {
        number
      }
    }
  `;

  const variables = {
    isoCodeDataInput
  }

  const req = graphQLClient.request(query, variables);

  req.then(res => {
    helpers.updateDataPipelineLogs(VaccDataPipelineName, true, isoCodeDataInput.length, res.updateIsoCodeData.number, '');
  }).catch(err => {
    helpers.updateDataPipelineLogs(VaccDataPipelineTxt, false, isoCodeDataInput.length, 0, err.message);
  });

  return req;
}

// *** IsoCodeVaccData updates

/** 
* Makes a single request to upload isoCodeDataInput
* @param {IsoCodeVaccDataInput} isoCodeVaccDataInput
* @return {Number} number of records added
* @author Mohamed Tayeh
*/
const addIsoCodeVaccDataReq = async (isoCodeVaccDataInput) => {

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

  let recordsSent = 0;
  let index = 0;

  // Use deep copy otherwise there is a conflict with shallow vs deep copies
  let deepCopy = lodash.cloneDeep(isoCodeVaccDataInput);

	isoCodeVaccDataInput.forEach(oneIsoCodeVaccData => {
		const maxI = Math.ceil(oneIsoCodeVaccData.data.length / numRecordsPerReq);

		for (let i = 0; i < maxI; i++){
			let queryVariables = oneIsoCodeVaccData;
      
			queryVariables.data = deepCopy[index].data.slice(i*numRecordsPerReq, (i+1)*numRecordsPerReq);
      recordsSent += queryVariables.data.length;

      allQueries.push(addIsoCodeVaccDataReq(queryVariables));
		}

    index++;
  })

  let result = Promise.all(allQueries).then(allRes => {
    let recordsAdded = allRes.reduce((a, b) => a + b.updateIsoCodeVaccData.number, 0);

    helpers.updateDataPipelineLogs(VaccDataPipelineName, true, recordsSent, recordsAdded, '');
    helpers.updateDataPipelineTxt(VaccDataPipelineTxt, true, recordsSent, recordsAdded, '');

    // Serialize the data here only when the call is successful
    fs.writeFile(StoredIsoCodeData, JSON.stringify(prevDataIsoCodeData), errCallback);
    fs.writeFile(StoredVaccData, JSON.stringify(prevDataVaccData), errCallback);
  }).catch(err => {
    helpers.updateDataPipelineLogs(VaccDataPipelineName, false, records, 0, err.message);
    helpers.updateDataPipelineTxt(VaccDataPipelineTxt, false, records, 0, err.message);
  })

  return result;
} 

const dataPipeline = async () => {
  await getDataSets();
  await isoCodesUpdateReq(isoCodesUpdatePayload);
  await isoCodeVaccDataUpdateReq(vaccDataPayload);
}

let scheduledJob = new CronJob(
	'00 00 09 * * *',
	dataPipeline,
	null,
	false,
	'America/Toronto'
);

scheduledJob.start();