const DataPipelineLogs = require('../../../models/DataPipelineLogs');
const resolverHelpers = require('../helper');

/**
 * Updates the data pipeline logs
 * @param {DataPipelineLogsInput} dataPipelineLogsInput
 * @return {Boolean} status of records insertion
 * @author Mohamed Tayeh
 */
module.exports = {
  updateDataPipelineLogs: async ({ dataPipelineLogsInput, username }) => {
    const {
      date,
      pipelineName,
      successStatus,
      recordsSent,
      recordsSuccessfullyAdded,
      msg,
    } = dataPipelineLogsInput;

    console.log(username);
    console.log(process.env.DATA_PIPELINE_USERNAME);

    if (username !== process.env.DATA_PIPELINE_USERNAME) {
      throw Error('Unauthorized action');
    }

    const newLog = new DataPipelineLogs({
      date,
      pipelineName,
      recordsSent,
      recordsSuccessfullyAdded,
      successStatus,
      msg,
    });

    const result = newLog
      .save()
      .then((record) => {
        return resolverHelpers.boolObj(true);
      })
      .catch((err) => {
        resolverHelpers.logError(err);
        return resolverHelpers.boolObj(false);
      });

    return result;
  },
};
