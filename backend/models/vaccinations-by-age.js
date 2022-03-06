
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vaccinationByAgeSchema = new Schema({
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
    age_group:{
        type: String,
        required: true
    },
    people_vaccinated_per_hundred:{
        type: Number,
        required: true
    },
    people_with_booster_per_hundred:{
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('VaccinationByAge', vaccinationByAgeSchema);