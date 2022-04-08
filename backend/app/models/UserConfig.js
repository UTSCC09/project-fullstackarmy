const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userConfigSchema = new Schema(
  {
    savedLanguage: {
      type: String,
    },
    savedIsoCodes: [
      {
        type: String,
      },
    ],
    savedStartDate: {
      type: Date,
    },
    savedEndDate: {
      type: Date,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { collection: 'UserConfig', timestamps: true }
);

module.exports = mongoose.model('UserConfig', userConfigSchema);
