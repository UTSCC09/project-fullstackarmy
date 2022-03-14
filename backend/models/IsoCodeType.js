const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const isoCodeTypeSchema = new Schema({
    isoCodeType: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    }
}, { collection: 'IsoCodeType' });

module.exports = mongoose.model('IsoCodeType', isoCodeTypeSchema);