const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const isoCodeSchema = new Schema({
    isoCode: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    },
    isoCodeName: {
        type: String,
        required: true
    },
    isoCodeType: {
        type: Schema.Types.ObjectId,
        ref: 'IsoCodeType'
    }
}, { collection: 'IsoCode' });

module.exports = mongoose.model('IsoCode', isoCodeSchema);