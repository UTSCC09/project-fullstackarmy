const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    savedConfigurations: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserConfig",
      },
    ],
  },
  { collection: "User" }
);

userSchema.index({ username: 1 }, { unique: true, dropDups: true });

module.exports = mongoose.model("User", userSchema);
