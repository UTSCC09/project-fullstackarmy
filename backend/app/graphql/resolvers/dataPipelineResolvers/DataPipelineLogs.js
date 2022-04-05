const DataPipelineLogs = require('../../../models/DataPipelineLogs');
const resolverHelpers = require('../helper');

/**
 * Updates the data pipeline logs
 * @param {DataPipelineLogsInput} dataPipelineLogsInput
 * @return {Boolean} status of records insertion
 * @author Mohamed Tayeh
 */
module.exports = {
  updateDataPipelineLogs: async ({ dataPipelineLogsInput }) => {
    const {
      date,
      pipelineName,
      successStatus,
      recordsSent,
      recordsSuccessfullyAdded,
      msg,
    } = dataPipelineLogsInput;

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
        return helper.boolObj(true);
      })
      .catch((err) => {
        resolverHelpers.logError(err);
        return helper.boolObj(false);
      });

    return result;
  },
};
