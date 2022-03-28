
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const isoCodeVaccSupplyDataSchema = new Schema({
    dosesRequiredFor85:{
        type: Number,
    },
    dosesExpected:{
        type: Number,
    },
    dosesDelivered:{
        type: Number,
    },
    dosesDeliveredExpectedPercent:{
        type: Number,
    },
    dosesDeliveredRequiredPercent:{
        type: Number,
    },
    dosesExpectedRequiredPercent:{
        type: Number,
    },
    isoCode: {
        type: Schema.Types.ObjectId,
        ref: 'IsoCode'
    }
}, {collection: 'IsoCodeVaccSupplyData'});

isoCodeVaccSupplyDataSchema.index({ "isoCode": 1}, { "unique": true, "dropDups": true });

module.exports = mongoose.model('IsoCodeVaccSupplyData', isoCodeVaccSupplyDataSchema);