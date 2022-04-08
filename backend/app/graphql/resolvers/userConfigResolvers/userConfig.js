const User = require('../../../models/User');
const UserConfig = require('../../../models/UserConfig');
const {
  boolObj,
  dateToString,
  logError,
  unexpectedError,
} = require('../helper');

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    logError(err);
    throw new Error('User was not found');
  }
};

const transformUserConfig = (userConfigData) => {
  if (userConfigData) {
    let savedDates;

    if (userConfigData._doc) {
      savedDates = userConfigData._doc.savedDates;
    } else {
      savedDates = userConfigData.savedDates;
    }

    return (res = {
      ...userConfigData._doc,
      _id: userConfigData.id,
      savedDates: userConfigData.savedDates.map((savedDate) =>
        dateToString(savedDate)
      ),
      user: user.bind(this, userConfigData.user),
    });
  }
  return {};
};

/**
 * @param {String!} user   User ID of config
 * @return {[UserConfig!]} All previously saved user configurations
 */
const userConfigs = async (user) => {
  try {
    const userConfigs = await UserConfig.find({ user }).exec();
    return userConfigs.map((userConfig) => {
      return transformUserConfig(userConfig);
    });
  } catch (err) {
    unexpectedError(err);
  }
};

const newUserConfig = async (userConfigInput) => {
  try {
    const { name, user, savedLanguage, savedIsoCodes, savedDates } =
      userConfigInput;
    const existingUser = await User.findById(user);
    if (!existingUser) {
      throw new Error('User does not exist.');
    }

    const userConfig = new UserConfig({
      name,
      user,
      savedLanguage,
      savedIsoCodes,
      savedDates,
    });

    const result = userConfig
      .save()
      .then((res) => {
        return boolObj(true);
      })
      .catch((err) => {
        return boolObj(false);
      });
    return result;
  } catch (err) {
    unexpectedError(err);
  }
};

module.exports = {
  userConfigs: async ({ user }) => {
    const result = userConfigs(user);
    return result;
  },
  addUserConfig: async ({ userConfigInput }) => {
    const result = newUserConfig(userConfigInput);
    return result;
  },
};
