const DataPipelineLogs = require('../../../models/DataPipelineLogs');
const helper = require('../helper');

/** 
* Updates the data pipeline logs
* @param {DataPipelineLogsInput} dataPipelineLogsInput
* @return {Boolean} status of records insertion
* @author Mohamed Tayeh
*/
module.exports = {
    updateDataPipelineLogs: async ({dataPipelineLogsInput}) => {
        const { date, pipelineName, successStatus, recordsSent, recordsSuccessfullyAdded } = dataPipelineLogsInput;

        const newLog = new DataPipelineLogs({
            date,
            pipelineName,
            recordsSent,
            recordsSuccessfullyAdded,
            successStatus
        }) 

        const result = newLog.save().then((record) => {
            return helper.boolObj(true);
        }).catch((err) => {
            return helper.boolObj(false);
        })

        return result;
    }
};