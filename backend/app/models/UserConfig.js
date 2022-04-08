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
    savedDates: [
      {
        type: Date,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
  },
  { collection: 'UserConfig', timestamps: true }
);
userConfigSchema.index({ name: 1 }, { unique: true, dropDups: true });

module.exports = mongoose.model('UserConfig', userConfigSchema);
