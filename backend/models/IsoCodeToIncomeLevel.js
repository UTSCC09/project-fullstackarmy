const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const isoCodeToIncomeLevelSchema = new Schema({
    year: {
        type: Date,
        required: true
    },
    incomeLevel: {
        type: Schema.Types.ObjectId,
        ref: 'incomeLevel'
    },
    isoCode: {
        type: Schema.Types.ObjectId,
        ref: 'IsoCode'
    }
}, { collection: 'IsoCodeToIncomeLevel' });

isoCodeToIncomeLevelSchema.index({ "isoCode": 1, "year": 1}, { "unique": true, "dropDups": true });

module.exports = mongoose.model('IsoCodeToIncomeLevel', isoCodeToIncomeLevelSchema);