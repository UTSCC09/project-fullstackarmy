const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const isoCodeVaccDataSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    totalVaccinations:{
        type: Number,
    },
    peopleVaccinated:{
        type: Number,
    },
    dailyVaccinationsRaw: {
        type: Number,
    }, 
    dailyVaccinations: {
        type: Number
    },
    totalVaccinationsPerHundred:{
        type: Number,
    },
    peopleVaccinatedPerHundred:{
        type: Number,
    },
    dailyVaccinationsPerMillion: {
        type: Number,
    },
    dailyPeopleVaccinated: {
        type: Number,
    },
    dailyPeopleVaccinatedPerHundred: {
        type: Number,
    },
    totalBoosters: {
        type: Number,
    },
    totalBoostersPerHundred: {
        type: Number,
    },
    isoCode: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    }
}, {collection: 'IsoCodeVaccData'});

isoCodeVaccDataSchema.index({ "isoCode": 1, "date": 1}, { "unique": true, "dropDups": true });

module.exports = mongoose.model('IsoCodeVaccData', isoCodeVaccDataSchema);