
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vaccinationDataPerCountrySchema = new Schema({
    // primary key
    iso_code: {
        type: String,
        required: true
    },
    date: {
        type: Date,
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
    // Connecting on model to another
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

vaccinationDataPerCountrySchema.index({ "iso_code": 1, "date": 1}, { "unique": true, "dropDups": true });

module.exports = mongoose.model('VaccinationData', vaccinationDataSchema);
