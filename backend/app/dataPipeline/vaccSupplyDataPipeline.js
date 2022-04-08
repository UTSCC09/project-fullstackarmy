const fetch = require('node-fetch');
const graphqlRequest = require('graphql-request');
const constants = require('./dataPipelineConstants');
const helpers = require('./dataPipelineHelpers');
const fs = require('fs');
const { CronJob } = require('cron');

const graphQLClient = new graphqlRequest.GraphQLClient(
  process.env.BACKEND_API_URL
);

const VaccSupplyDataURL =
  'https://data.covid19taskforce.com/covax-api/getCovaxDashboardData';
const StoredFileName = 'VaccSupplyData.txt';

const VaccSupplyDataPipelineName = 'vaccineSupplyPipeline';
const VaccSupplyDataPipelineTxt = 'vaccineSupplyPipelinelogs.txt';

let vaccSupplyPayload = [];

// Set up key value pair dict to store the data so that data checks can be done
// efficiently
// Get the previous data sent to backend
let prevData;

/**
 * FS call back in case of error
 * @param {NodeJS.ErrnoException} err
 * @return {NodeJS.ErrnoException | null} the error or null
 */
const errCallback = (err) => {
  if (err) {
    helpers.logError(err);
    helpers.updateDataPipelineLogs(
      VaccSupplyDataPipelineName,
      false,
      0,
      0,
      err.message,
      authToken
    );
    helpers.updateDataPipelineTxt(
      VaccSupplyDataPipelineTxt,
      false,
      0,
      0,
      err.message,
      authToken
    );
  }
  return null;
};

/**
 * Gets the datasets for the vaccination supply data
 * @summary changes the data so that it aligns with the correct variable names in the backend
 * as well as the correct estimate for herd immunation/protection
 * @note We are only interested in country data from this data source
 * @note We are storing a copy of the previous data as a txt files in the storage so that it
 * can be compared with the latest fetched data so that only new data is sent to the server
 * @author Mohamed Tayeh
 */
const getDataSets = async () => {
  try {
    // Done synchronously since it is needed in the rest of the function
    prevData = JSON.parse(fs.readFileSync(StoredFileName));
  } catch (err) {
    helpers.logError(err);
    return false;
  }

  // Get the new data
  const isoCodesVaccSupplyData = await fetch(VaccSupplyDataURL);
  let isoCodesVaccSupplyDataJSON = await isoCodesVaccSupplyData.json();

  isoCodesVaccSupplyDataJSON.forEach((dataRow) => {
    let isoCode = dataRow.iso3CountryCode;

    // Only interested in country data from this source
    if (helpers.isoCodeToType(isoCode) != constants.country) {
      return;
    }

    // Get current data
    let dosesExpected = helpers.modifiedParseFloat(
      dataRow.expectedSourcingDoses
    );
    let dosesDelivered = helpers.modifiedParseFloat(dataRow.totalSuppliesCount);
    let dosesRequiredFor70 = helpers.modifiedParseFloat(
      dataRow.targetRequiredDoses70
    );

    // Check if same as previous data
    let prevDataRow = prevData[isoCode];

    // If not newly added, compare to previous values
    if (prevDataRow) {
      let cond1 = prevDataRow.dosesExpected === dosesExpected;
      let cond2 = prevDataRow.dosesDelivered === dosesDelivered;
      let cond3 = prevDataRow.dosesRequiredFor70 === dosesRequiredFor70;

      if (cond1 && cond2 && cond3) {
        return;
      }
    }

    // Change to new estimate for herd immunity/protection
    let dosesRequiredFor85 = Math.ceil((dosesRequiredFor70 / 70) * 85);

    // Supply it has gotten so far from promised
    let dosesDeliveredExpectedPercent =
      Math.round((dosesDelivered / dosesExpected) * 10000) / 100;

    // How much supply the country has to reach herd immunity/protection
    let dosesDeliveredRequiredPercent =
      Math.round((dosesDelivered / dosesRequiredFor85) * 10000) / 100;

    // How much Supply it needs to secure to reach heard immuntiy
    let dosesExpectedRequiredPercent =
      Math.round((dosesExpected / dosesRequiredFor85) * 10000) / 100;

    prevData[isoCode] = {
      dosesRequiredFor70,
      dosesExpected,
      dosesDelivered,
    };

    vaccSupplyPayload.push({
      isoCode,
      dosesRequiredFor85,
      dosesExpected,
      dosesDelivered,
      dosesDeliveredExpectedPercent,
      dosesDeliveredRequiredPercent,
      dosesExpectedRequiredPercent,
    });
  });

  return true;
};

/**
 * Makes a single request to upload isoCodeDataInput
 * @param {IsoCodeVaccDataInput} isoCodeVaccSupplyDataInput
 * @return {Number} number of records added
 * @author Mohamed Tayeh
 */
const addIsoCodeVaccSupplyDataReq = async (
  isoCodeVaccSupplyDataInput,
  authToken
) => {
  const query = graphqlRequest.gql`
    mutation UpdateIsoCodeVaccSupplyData($isoCodeVaccSupplyDataInput: [IsoCodeVaccSupplyDataInput!]!, $username: String!) {              
      updateIsoCodeVaccSupplyData(isoCodeVaccSupplyDataInput: $isoCodeVaccSupplyDataInput, username: $username) {
        number
      }
    }
  `;

  const variables = {
    isoCodeVaccSupplyDataInput,
    username: process.env.DATA_PIPELINE_USERNAME,
  };

  graphQLClient.setHeader('authorization', `Bearer ${authToken}`);
  const req = graphQLClient.request(query, variables);

  req
    .then((res) => {
      // Only write the file when successful
      helpers.updateDataPipelineLogs(
        VaccSupplyDataPipelineName,
        true,
        isoCodeVaccSupplyDataInput.length,
        res.updateIsoCodeVaccSupplyData.number,
        '',
        authToken
      );

      helpers.updateDataPipelineTxt(
        VaccSupplyDataPipelineTxt,
        true,
        isoCodeVaccSupplyDataInput.length,
        res.updateIsoCodeVaccSupplyData.number,
        ''
      );

      fs.writeFile(StoredFileName, JSON.stringify(prevData), errCallback);
    })
    .catch((err) => {
      helpers.logError(err);

      helpers.updateDataPipelineLogs(
        VaccSupplyDataPipelineName,
        false,
        isoCodeVaccSupplyDataInput.length,
        0,
        err.message,
        authToken
      );

      helpers.updateDataPipelineTxt(
        VaccSupplyDataPipelineTxt,
        false,
        isoCodeVaccSupplyDataInput.length,
        0,
        err.message
      );
    });

  return req;
};

const dataPipeline = async () => {
  let dataSetsSuccess = await getDataSets();
  if (dataSetsSuccess) {
    let authToken = await helpers.authenticationToken();
    await addIsoCodeVaccSupplyDataReq(vaccSupplyPayload, authToken);
  }
};

dataPipeline();

// let scheduledJob = new CronJob(
//   '00 30 09 * * *',
//   dataPipeline,
//   null,
//   false,
//   'America/Toronto'
// );

// scheduledJob.start();
