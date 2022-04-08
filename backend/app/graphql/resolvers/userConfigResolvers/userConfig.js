const User = require('../../../models/User');
const UserConfig = require('../../../models/UserConfig');
const {
  boolObj,
  dateToString,
  logError,
  unexpectedError,
  sanitizeInputs,
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
    let savedStartDate, savedEndDate;

    if (userConfigData._doc) {
      savedStartDate = userConfigData._doc.savedStartDate;
      savedEndDate = userConfigData._doc.savedEndDate;
    } else {
      savedStartDate = userConfigData.savedStartDate;
      savedStartDate = userConfigData.savedStartDate;
    }

    return (res = {
      ...userConfigData._doc,
      _id: userConfigData.id,
      savedStartDate: dateToString(userConfigData.savedStartDate),
      savedEndDate: dateToString(userConfigData.savedEndDate),
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
    const {
      name,
      user,
      savedLanguage,
      savedIsoCodes,
      savedStartDate,
      savedEndDate,
    } = userConfigInput;
    const existingUser = await User.findById(user);
    if (!existingUser) {
      throw new Error('User does not exist.');
    }

    // check valid date range
    if (
      (savedStartDate && !savedEndDate) ||
      (!savedStartDate && savedEndDate)
    ) {
      throw new Error('Invalid date range.');
    }

    const userConfig = new UserConfig({
      name,
      user,
      savedLanguage,
      savedIsoCodes,
      savedStartDate,
      savedEndDate,
    });

    const result = userConfig
      .save()
      .then((res) => {
        return boolObj(true);
      })
      .catch((err) => {
        console.log(err);
        return boolObj(false);
      });
    return result;
  } catch (err) {
    unexpectedError(err);
  }
};

module.exports = {
  userConfigs: async ({ user }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    sanitizeInputs({ user });
    const result = userConfigs(user);
    return result;
  },
  addUserConfig: async ({ userConfigInput }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    sanitizeInputs(userConfigInput);
    const result = newUserConfig(userConfigInput);
    return result;
  },
};
