const fetch = require("node-fetch");
const graphqlRequest = require("graphql-request");
const csvtojson = require("csvtojson");
const lodash = require("lodash");
const helpers = require("./dataPipelineHelpers");
const fs = require("fs");
const { CronJob } = require("cron");

const graphQLClient = new graphqlRequest.GraphQLClient(
  process.env.BACKEND_API_URL
);

const CountryIncomeLevelDataURL =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/scripts/input/wb/income_groups.csv";
const IsoCodesVaccDataURL =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json";

const StoredIsoCodeData = "IsoCodeData.txt";
const StoredVaccData = "VaccData.txt";

const VaccDataPipelineName = "vacDataPipelineName";
const VaccDataPipelineTxt = "vacDataPipelineLogs.txt";

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
    helpers.logError(err);
    helpers.updateDataPipelineLogs(
      VaccDataPipelineName,
      false,
      0,
      0,
      err.message
    );
    helpers.updateDataPipelineTxt(
      VaccDataPipelineTxt,
      false,
      0,
      0,
      err.message
    );
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
    prevDataIsoCodeData = {};
    prevDataVaccData = {};
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
          incomeLevel: dataPoint["Income group"],
          year: dataPoint.Year,
        };

        // Check if same as previous data
        let prevDataRow = prevDataIsoCodeData[isoCode];
        if (prevDataRow && lodash.isEqual(prevDataRow, newData)) return;

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
};

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
    isoCodeDataInput,
  };

  const req = graphQLClient.request(query, variables);

  req
    .then((res) => {
      helpers.updateDataPipelineLogs(
        VaccDataPipelineName,
        true,
        isoCodeDataInput.length,
        res.updateIsoCodeData.number,
        ""
      );
    })
    .catch((err) => {
      helpers.logError(err);
      helpers.updateDataPipelineLogs(
        VaccDataPipelineTxt,
        false,
        isoCodeDataInput.length,
        0,
        err.message
      );
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
const addIsoCodeVaccDataReq = async (isoCodeVaccDataInput) => {
  const query = graphqlRequest.gql`
    mutation UpdateIsoCodeVaccData($isoCodeVaccDataInput: [IsoCodeVaccDataInput!]!) {              
      updateIsoCodeVaccData(isoCodeVaccDataInput: $isoCodeVaccDataInput) {
        number
      }
    }
  `;

  const variables = {
    isoCodeVaccDataInput,
  };

  return graphQLClient.request(query, variables);
};

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

  isoCodeVaccDataInput.forEach((oneIsoCodeVaccData) => {
    const maxI = Math.ceil(oneIsoCodeVaccData.data.length / numRecordsPerReq);

    for (let i = 0; i < maxI; i += 1) {
      let queryVariables = oneIsoCodeVaccData;

      queryVariables.data = deepCopy[index].data.slice(
        i * numRecordsPerReq,
        (i + 1) * numRecordsPerReq
      );
      recordsSent += queryVariables.data.length;

      allQueries.push(addIsoCodeVaccDataReq(queryVariables));
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
        ""
      );
      helpers.updateDataPipelineTxt(
        VaccDataPipelineTxt,
        true,
        recordsSent,
        recordsAdded,
        ""
      );

      // Serialize the data here only when the call is successful
      fs.writeFile(
        StoredIsoCodeData,
        JSON.stringify(prevDataIsoCodeData),
        errCallback
      );
      fs.writeFile(
        StoredVaccData,
        JSON.stringify(prevDataVaccData),
        errCallback
      );
    })
    .catch((err) => {
      helpers.logError(err);
      helpers.updateDataPipelineLogs(
        VaccDataPipelineName,
        false,
        recordsSent,
        0,
        err.message
      );
      helpers.updateDataPipelineTxt(
        VaccDataPipelineTxt,
        false,
        recordsSent,
        0,
        err.message
      );
    });

  return result;
};

const dataPipeline = async () => {
  await getDataSets();
  await isoCodesUpdateReq(isoCodesUpdatePayload);
  await isoCodeVaccDataUpdateReq(vaccDataPayload);
};

let scheduledJob = new CronJob(
  "00 00 09 * * *",
  dataPipeline,
  null,
  false,
  "America/Toronto"
);

scheduledJob.start();
