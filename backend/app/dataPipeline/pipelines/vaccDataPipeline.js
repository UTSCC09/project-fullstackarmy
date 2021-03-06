const fetch = require('node-fetch');
const graphqlRequest = require('graphql-request');
const csvtojson = require('csvtojson');
const lodash = require('lodash');
const helpers = require('../helpers/dataPipelineHelpers');
const fs = require('fs');
const { CronJob } = require('cron');

const CountryIncomeLevelDataURL =
  'https://raw.githubusercontent.com/owid/covid-19-data/master/scripts/input/wb/income_groups.csv';
const IsoCodesVaccDataURL =
  'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json';

const StoredIsoCodeData = '../txtFiles/isoCodeData.txt';
const StoredVaccData = '../txtFiles/vaccData.txt';

const IsoCodeDataPipelineName = 'isoCodeDataPipeline';
const IsoCodeDataPipelineTxt = '../txtFiles/isoCodeDataPipelineLogs.txt';

const VaccDataPipelineName = 'vaccDataPipeline';
const VaccDataPipelineTxt = '../txtFiles/vaccDataPipelineLogs.txt';

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
const errCallback = (pipelineName, pipelineTxt, err, authToken) => {
  if (err) {
    helpers.logError(err);
    helpers.updateDataPipelineLogs(
      pipelineName,
      false,
      0,
      0,
      err.message,
      authToken
    );
    helpers.updateDataPipelineTxt(pipelineTxt, false, 0, 0, err.message);
  }
  return null;
};

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
    helpers.logError(err);
    return false;
  }

  // To avoid adding duplicates in the isoCodes obtained
  // from the vaccination data
  let isoCodesAlreadyInPayload = [];

  const countryIncomeLevelData = await fetch(CountryIncomeLevelDataURL);
  let csvData = await countryIncomeLevelData.text();

  await csvtojson()
    .fromString(csvData)
    .then((jsonData) => {
      jsonData.forEach((dataPoint) => {
        let isoCode = dataPoint.Code;

        // Get current data
        let newData = {
          isoCodeName: dataPoint.Country,
          isoCodeType: helpers.isoCodeToType(dataPoint.Code),
          incomeLevel: dataPoint['Income group'],
          year: dataPoint.Year,
        };

        // Check if same as previous data
        let prevDataRow = prevDataIsoCodeData[isoCode];
        if (lodash.isEqual(prevDataRow, newData)) {
          isoCodesAlreadyInPayload.push(isoCode);
          return;
        }

        prevDataIsoCodeData[isoCode] = newData;
        isoCodesUpdatePayload.push({
          ...newData,
          isoCode,
        });

        isoCodesAlreadyInPayload.push(isoCode);
      });
    })
    .catch((err) => {
      helpers.logError(err);
      return null;
    });

  const isoCodesVaccData = await fetch(IsoCodesVaccDataURL);
  let isoCodesVaccDataJSON = await isoCodesVaccData.json();

  isoCodesVaccDataJSON.forEach((isoCodeVaccData) => {
    let isoCode = isoCodeVaccData.iso_code;

    // Add all the isoCodes that are not in the incomeLevel dataset
    if (isoCodesAlreadyInPayload.indexOf(isoCode) == -1) {
      let newData = {
        isoCodeName: isoCodeVaccData.country,
        isoCodeType: helpers.isoCodeToType(isoCode),
      };

      // Check if same as previous data (conds are different)
      let prevDataRow = prevDataIsoCodeData[isoCode];
      if (!lodash.isEqual(prevDataRow, newData)) {
        prevDataIsoCodeData[isoCode] = newData;
        isoCodesUpdatePayload.push({
          ...newData,
          isoCode,
        });
      }
    }

    let data = [];

    isoCodeVaccData.data.forEach((dataEl) => {
      // Get current data
      let date = dataEl.date;

      let newData = {
        totalVaccinations: helpers.modifiedParseFloat(
          dataEl.total_vaccinations
        ),
        totalVaccinationsPerHundred: helpers.modifiedParseFloat(
          dataEl.total_vaccinations_per_hundred
        ),
        peopleVaccinated: helpers.modifiedParseFloat(dataEl.people_vaccinated),
        peopleVaccinatedPerHundred: helpers.modifiedParseFloat(
          dataEl.people_vaccinated_per_hundred
        ),
        dailyVaccinationsRaw: helpers.modifiedParseFloat(
          dataEl.daily_vaccinations_raw
        ),
        dailyVaccinations: helpers.modifiedParseFloat(
          dataEl.daily_vaccinations
        ),
        dailyVaccinationsPerMillion: helpers.modifiedParseFloat(
          dataEl.daily_vaccinations_per_million
        ),
        dailyPeopleVaccinated: helpers.modifiedParseFloat(
          dataEl.daily_people_vaccinated
        ),
        dailyPeopleVaccinatedPerHundred: helpers.modifiedParseFloat(
          dataEl.daily_people_vaccinated_per_hundred
        ),
        peopleFullyVaccinated: helpers.modifiedParseFloat(
          dataEl.people_fully_vaccinated
        ),
        peopleFullyVaccinatedPerHundred: helpers.modifiedParseFloat(
          dataEl.people_fully_vaccinated_per_hundred
        ),
        totalBoosters: helpers.modifiedParseFloat(dataEl.total_boosters),
        totalBoostersPerHundred: helpers.modifiedParseFloat(
          dataEl.total_boosters_per_hundred
        ),
      };

      // Make the data key
      let vaccDataKey = isoCode.concat(date);

      // Check if same as previous data
      let prevDataRow = prevDataVaccData[vaccDataKey];
      if (lodash.isEqual(newData, prevDataRow)) return;

      prevDataVaccData[vaccDataKey] = newData;

      data.push({
        date,
        ...newData,
      });
    });

    vaccDataPayload.push({
      isoCode,
      data,
    });
  });

  return true;
};

// *** IsoCodeData updates
/**
 * Sends a request to updateIsoCodeData pipeline in the backend
 * @param {IsoCodeDataInput} isoCodeDataInput
 * @return {Number} number of records created
 * @note Small dataset therefore there is no need to perform batch requests
 * @author Mohamed Tayeh
 */
const isoCodesUpdateReq = async (isoCodeDataInput, authToken) => {
  const query = graphqlRequest.gql`  
    mutation UpdateIsoCodeData($isoCodeDataInput: [IsoCodeDataInput], $username: String!) {              
      updateIsoCodeData(isoCodeDataInput: $isoCodeDataInput, username: $username) {
        number
      }
    }
  `;

  const variables = {
    isoCodeDataInput,
    username: process.env.DATA_PIPELINE_USERNAME,
  };

  helpers.graphQLClient.setHeader('authorization', `Bearer ${authToken}`);

  const req = helpers.graphQLClient.request(query, variables);

  req
    .then((res) => {
      helpers.updateDataPipelineLogs(
        IsoCodeDataPipelineName,
        true,
        isoCodeDataInput.length,
        res.updateIsoCodeData.number,
        '',
        authToken
      );

      helpers.updateDataPipelineTxt(
        IsoCodeDataPipelineTxt,
        true,
        isoCodeDataInput.length,
        res.updateIsoCodeData.number,
        ''
      );
    })
    .catch((err) => {
      helpers.logError(err);

      helpers.updateDataPipelineLogs(
        IsoCodeDataPipelineName,
        false,
        isoCodeDataInput.length,
        0,
        err.message,
        authToken
      );

      helpers.updateDataPipelineTxt(
        IsoCodeDataPipelineTxt,
        false,
        isoCodeDataInput.length,
        0,
        err.message
      );

      return null;
    });

  return req;
};

// *** IsoCodeVaccData updates

/**
 * Makes a single request to upload isoCodeDataInput
 * @param {IsoCodeVaccDataInput} isoCodeVaccDataInput
 * @return {Number} number of records added
 * @author Mohamed Tayeh
 */
const addIsoCodeVaccDataReq = async (isoCodeVaccDataInput, authToken) => {
  const query = graphqlRequest.gql`
    mutation UpdateIsoCodeVaccData($isoCodeVaccDataInput: [IsoCodeVaccDataInput!]!, $username: String!) {              
      updateIsoCodeVaccData(isoCodeVaccDataInput: $isoCodeVaccDataInput, username: $username) {
        number
      }
    }
  `;

  const variables = {
    isoCodeVaccDataInput,
    username: process.env.DATA_PIPELINE_USERNAME,
  };

  helpers.graphQLClient.setHeader('authorization', `Bearer ${authToken}`);

  return helpers.graphQLClient.request(query, variables);
};

/**
 * Uses addIsoCodeVaccDataReq to create batch requests to the backend
 * @param {IsoCodeVaccDataInput} isoCodeVaccDataInput
 * @return {Number} number of batch requests made
 * @note Batches the requests manually
 * @note No async here so that it doesn't return a promise but an array of promises
 * @author Mohamed Tayeh
 */
const isoCodeVaccDataUpdateReq = (isoCodeVaccDataInput, authToken) => {
  let allQueries = [];
  const numRecordsPerReq = 200;

  let recordsSent = 0;
  let index = 0;

  // Use deep copy otherwise there is a conflict with shallow vs deep copies
  let deepCopy = lodash.cloneDeep(isoCodeVaccDataInput);

  isoCodeVaccDataInput.forEach((oneIsoCodeVaccData) => {
    const maxI = Math.ceil(oneIsoCodeVaccData.data.length / numRecordsPerReq);

    for (let i = 0; i < maxI; i += 1) {
      let queryVariables = oneIsoCodeVaccData;

      queryVariables.data = deepCopy[index].data.slice(
        i * numRecordsPerReq,
        (i + 1) * numRecordsPerReq
      );
      recordsSent += queryVariables.data.length;

      allQueries.push(addIsoCodeVaccDataReq(queryVariables, authToken));
    }

    index += 1;
  });

  let result = Promise.all(allQueries)
    .then((allRes) => {
      let recordsAdded = allRes.reduce(
        (a, b) => a + b.updateIsoCodeVaccData.number,
        0
      );

      helpers.updateDataPipelineLogs(
        VaccDataPipelineName,
        true,
        recordsSent,
        recordsAdded,
        '',
        authToken
      );

      helpers.updateDataPipelineTxt(
        VaccDataPipelineTxt,
        true,
        recordsSent,
        recordsAdded,
        ''
      );

      // Serialize the data here only when the call is successful
      try {
        fs.writeFileSync(
          StoredIsoCodeData,
          JSON.stringify(prevDataIsoCodeData)
        );
      } catch (e) {
        errCallback(
          IsoCodeDataPipelineName,
          IsoCodeDataPipelineTxt,
          e,
          authToken
        );
      }

      try {
        fs.writeFileSync(StoredVaccData, JSON.stringify(prevDataVaccData));
      } catch (e) {
        errCallback(VaccDataPipelineName, VaccDataPipelineTxt, e, authToken);
      }
    })
    .catch((err) => {
      helpers.logError(err);
      helpers.updateDataPipelineLogs(
        VaccDataPipelineName,
        false,
        recordsSent,
        0,
        err.message,
        authToken
      );

      helpers.updateDataPipelineTxt(
        VaccDataPipelineTxt,
        false,
        recordsSent,
        0,
        err.message
      );
      return null;
    });

  return result;
};

const dataPipeline = async () => {
  try {
    let dataSetsSuccess = await getDataSets();
    if (dataSetsSuccess) {
      let authToken = await helpers.authenticationToken();
      await isoCodesUpdateReq(isoCodesUpdatePayload, authToken);
      await isoCodeVaccDataUpdateReq(vaccDataPayload, authToken);
    }
  } catch (err) {
    helpers.logError(err);
  }
};

let scheduledJob = new CronJob(
  '00 00 09 * * *',
  dataPipeline,
  null,
  false,
  'America/Toronto'
);

scheduledJob.start();
