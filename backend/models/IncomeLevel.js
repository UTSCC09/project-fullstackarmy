
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const incomeLevelSchema = new Schema({
    incomeLevel: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    }
}, { collection: 'IncomeLevel' });

module.exports = mongoose.model('IncomeLevel', incomeLevelSchema);