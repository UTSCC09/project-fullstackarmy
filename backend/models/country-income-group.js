
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countryIncomeGroupSchema = new Schema({
    // primary key
    iso_code: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    },
    // primary key
    year: {
        type: Date,
        unique: true,
        dropDups: true,
        required: true
    },
    income_group: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CountryIncomeGroup', countryIncomeGroupSchema);