
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vaccinationDataSchema = new Schema({
    // primary key
    iso_code: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    },
    // primary key
    date: {
        type: Date,
        unique: true,
        dropDups: true,
        required: true
    },
    total_vaccinations:{
        type: Number,
        required: true
    },
    people_vaccinated:{
        type: Number,
        required: true
    },
    total_vaccinations_per_hundred:{
        type: Number,
        required: true
    },
    people_vaccinated_per_hundred:{
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('VaccinationData', vaccinationDataSchema);