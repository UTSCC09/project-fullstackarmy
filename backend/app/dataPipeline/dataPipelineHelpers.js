const constants = require('./dataPipelineConstants');
const graphqlRequest = require('graphql-request');

const graphQLClient = new graphqlRequest.GraphQLClient('http://localhost:3000/api');

/** 
* Returns the isoCodeType based on the isoCode
* @summary Defaults to country if not found
* @param {String} isoCode
* @return {String} isoCodeToType
* @author Mohamed Tayeh
*/
const isoCodeToType = (isoCode) => {

  let type = constants.isoCodeToTypes[isoCode];

  if (!type) return constants.country;
  return type;
}

/** 
* Modified Parse float
* @param {Number} number 
* @return {Number | null} null if it is NaN
*/
const modifiedParseFloat = (number) => {
  let float = parseFloat(number);
  if (!isNaN(float)) return float;
  return null;
}

/** 
* Returns the date that the script was ran on with EST time
* @return {Date}
* @note credits: https://stackoverflow.com/questions/36206260/how-to-set-date-always-to-eastern-time-regardless-of-users-time-zone
*/
const createESTDate = () => {
  let dt = new Date();

  dt.setTime(dt.getTime()+dt.getTimezoneOffset()*60*1000);

  let offset = -300; //Timezone offset for EST in minutes.
  let estDate = new Date(dt.getTime() + offset*60*1000);

  return estDate;
}

/** 
* Sends a request to update the data pipeline logs
* @param {Date} date 
* @param {String} pipelineName 
* @param {Boolean} successStatus 
* @param {Number} recordsSent 
* @param {Number} recordsSuccessfullyAdded 
* @return {Request Promise}
*/
const updateDataPipelineLogs = (pipelineName, successStatus, recordsSent, recordsSuccessfullyAdded) => {
  
  let date = createESTDate();

  const query = graphqlRequest.gql`  
    mutation UpdateDataPipelineLogs($dataPipelineLogsInput: DataPipelineLogsInput!) {              
      updateDataPipelineLogs(dataPipelineLogsInput: $dataPipelineLogsInput) {
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
      recordsSuccessfullyAdded
    }
  }

  return graphQLClient.request(query, variables);
}

exports.isoCodeToType = isoCodeToType;
exports.modifiedParseFloat = modifiedParseFloat;
exports.updateDataPipelineLogs = updateDataPipelineLogs;