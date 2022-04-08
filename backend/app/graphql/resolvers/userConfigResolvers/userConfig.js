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
    let savedStartDate, savedEndDate;

    if (userConfigData._doc) {
      savedStartDate = userConfigData._doc.savedStartDate;
      savedEndDate = userConfigData._doc.savedEndDate;
    } else {
      savedStartDate = userConfigData.savedStartDate;
      savedEndDate = userConfigData.savedEndDate;
    }

    return (res = {
      ...userConfigData._doc,
      _id: userConfigData.id,
      savedStartDate: dateToString(savedStartDate),
      savedEndDate: dateToString(savedEndDate),
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

const mostRecentSavedIsoCodes = async (user) => {
  try {
    const query = await UserConfig.findOne({
      $and: [{ user }, { savedIsoCodes: { $ne: [] } }],
    }).sort({ createdAt: -1 });
    return transformUserConfig(query);
  } catch (err) {
    unexpectedError(err);
  }
};

const mostRecentSavedLanguage = async (user) => {
  try {
    const query = await UserConfig.findOne({
      $and: [{ user }, { savedLanguage: { $ne: null } }],
    }).sort({ createdAt: -1 });
    return transformUserConfig(query);
  } catch (err) {
    unexpectedError(err);
  }
};

const mostRecentSavedDateRange = async (user) => {
  try {
    const query = await UserConfig.findOne({
      $and: [
        { user },
        { savedStartDate: { $ne: null } },
        { savedEndDate: { $ne: null } },
      ],
    }).sort({ createdAt: -1 });
    return transformUserConfig(query);
  } catch (err) {
    unexpectedError(err);
  }
};

const newUserConfig = async (userConfigInput) => {
  try {
    const { user, savedLanguage, savedIsoCodes, savedStartDate, savedEndDate } =
      userConfigInput;
    const existingUser = await User.findById(user);
    if (!existingUser) {
      throw new Error('User does not exist.');
    }

    // check that date range is valid
    if (
      (savedStartDate && !savedEndDate) ||
      (!savedStartDate && savedEndDate)
    ) {
      throw new Error('Invalid date range');
    }
    const userConfig = new UserConfig({
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
        return boolObj(false);
      });
    return result;
  } catch (err) {
    unexpectedError(err);
  }
};

const delUserConfig = async (userConfigId) => {
  try {
    const userConfig = await UserConfig.findById(userConfigId);
    if (!userConfig) {
      throw new Error('User config does not exist.');
    }

    const result = UserConfig.deleteOne({ _id: userConfigId })
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
  getMostRecentSavedIsoCodes: async ({ user }) => {
    const result = mostRecentSavedIsoCodes(user);
    return result;
  },
  getMostRecentSavedLanguage: async ({ user }) => {
    const result = mostRecentSavedLanguage(user);
    return result;
  },
  getMostRecentSavedDateRange: async ({ user }) => {
    const result = mostRecentSavedDateRange(user);
    return result;
  },
  addUserConfig: async ({ userConfigInput }) => {
    const result = newUserConfig(userConfigInput);
    return result;
  },
  removeUserConfig: async ({ userConfigId }) => {
    const result = delUserConfig(userConfigId);
    return result;
  },
};
