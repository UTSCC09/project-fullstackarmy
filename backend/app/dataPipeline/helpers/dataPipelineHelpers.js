const constants = require('./dataPipelineConstants');
const graphqlRequest = require('graphql-request');
const fs = require('fs');
const moment = require('moment');
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.DATA_PIPELINE_SENTRY_URL,
  tracesSampleRate: 1.0,
});

const graphQLClient = new graphqlRequest.GraphQLClient(
  process.env.BACKEND_API_URL
);

/**
 * Returns the isoCodeType based on the isoCode
 * @summary Defaults to country if not found
 * @param {String} isoCode
 * @return {String} isoCodeToType
 * @author Mohamed Tayeh
 */
const isoCodeToType = (isoCode) => {
  let type = constants.isoCodeToTypes[isoCode];

  if (!type) {
    return constants.country;
  }
  return type;
};

/**
 * Modified Parse float
 * @param {Number} number
 * @return {Number | null} null if it is NaN
 */
const modifiedParseFloat = (number) => {
  let float = parseFloat(number);
  if (!isNaN(float)) return float;
  return null;
};

/**
 * Returns the date that the script was ran on with EST time
 * @return {Date}
 * @note credits: https://stackoverflow.com/questions/36206260/how-to-set-date-always-to-eastern-time-regardless-of-users-time-zone
 */
const createESTDate = () => {
  let d = new Date();
  let myTimezone = 'America/Toronto';
  let myDatetimeFormat = 'YYYY-MM-DD hh:mm:ss a z';
  let myDatetimeString = moment(d).tz(myTimezone).format(myDatetimeFormat);

  return myDatetimeString;
};

/**
 * Sends a request to update the data pipeline logs
 * @param {Date} date
 * @param {String} pipelineName
 * @param {Boolean} successStatus
 * @param {Number} recordsSent
 * @param {Number} recordsSuccessfullyAdded
 * @return {Request Promise}
 * @note this is not awaited
 */
const updateDataPipelineLogs = (
  pipelineName,
  successStatus,
  recordsSent,
  recordsSuccessfullyAdded,
  msg,
  authToken
) => {
  let date = createESTDate();

  const query = graphqlRequest.gql`  
    mutation UpdateDataPipelineLogs($dataPipelineLogsInput: DataPipelineLogsInput!, $username: String!) {              
      updateDataPipelineLogs(dataPipelineLogsInput: $dataPipelineLogsInput, username: $username) {
        bool
      }
    }
  `;

  const variables = {
    dataPipelineLogsInput: {
      date,
      pipelineName,
      successStatus,
      recordsSent,
      recordsSuccessfullyAdded,
      msg,
    },
    username: process.env.DATA_PIPELINE_USERNAME,
  };

  graphQLClient.setHeader('authorization', `Bearer ${authToken}`);

  // If there is an error it shouldn't crash the program
  const req = graphQLClient.request(query, variables).catch((err) => {
    Sentry.captureException(err);
  });

  return req;
};

const updateDataPipelineTxt = (
  pipelineLogs,
  successStatus,
  recordsSent,
  recordsSuccessfullyAdded,
  msg
) => {
  let date = createESTDate();

  let text = `${date.toLocaleString()} ${pipelineLogs} successStatus: ${successStatus} recordsSent: ${recordsSent} recordsSuccessfullyAdded: ${recordsSuccessfullyAdded} errorMsg: ${msg} \n`;

  fs.appendFile(pipelineLogs, text, function (err) {
    if (err) Sentry.captureException(err);
    return;
  });
};

const logError = (err) => {
  Sentry.captureException(err);
};

const authenticationToken = () => {
  const query = graphqlRequest.gql`  
  query Signin($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      userId
      token
      tokenExpiration
    } 
  }
  `;

  const variables = {
    username: process.env.DATA_PIPELINE_USERNAME,
    password: process.env.DATA_PIPELINE_PASSWORD,
  };

  // If there is an error it shouldn't crash the program
  const req = graphQLClient
    .request(query, variables)
    .then((res) => {
      return res.signin.token;
    })
    .catch((err) => {
      throw err;
      Sentry.captureException(err);
      return null;
    });

  return req;
};

exports.isoCodeToType = isoCodeToType;
exports.modifiedParseFloat = modifiedParseFloat;
exports.updateDataPipelineLogs = updateDataPipelineLogs;
exports.updateDataPipelineTxt = updateDataPipelineTxt;
exports.logError = logError;
exports.authenticationToken = authenticationToken;
exports.graphQLClient = graphQLClient;
