
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataPipelineLogsSchema = new Schema({
    recordsSent:{
        type: Number,
        required: true,
    },
    recordsSuccessfullyAdded:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    pipelineName: {
        type: String, 
        required: true,
    },
    successStatus:{
        type: Boolean,
        required: true,
    },
    msg:{
        type: String,
    }
}, {collection: 'DataPipelineLogs'});

module.exports = mongoose.model('DataPipelineLogs', dataPipelineLogsSchema);