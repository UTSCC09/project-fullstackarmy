const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userConfigSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    savedLanguage:{
        type: String,
    },
    savedIsoCodes:[
            {
                type: Schema.Types.ObjectId,
                ref: 'IsoCode',
            }
    ],
    savedDateRange: {
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    }
  
}, { collection: 'UserConfig' });

isoCodeToIncomeLevelSchema.index({ "user": 1}, { "unique": true, "dropDups": true });


module.exports = mongoose.model('UserConfig', userConfigSchema);