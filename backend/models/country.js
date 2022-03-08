
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    // primary key
    iso_code: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    },
    country_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Country', countrySchema);