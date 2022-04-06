const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userConfigSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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
  },
  { collection: "UserConfig", timestamps: true }
);

module.exports = mongoose.model("UserConfig", userConfigSchema);
