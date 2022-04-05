const User = require('../../../models/User');
const UserConfig = require('../../../models/UserConfig');
const { boolObj, dateToString } = require('../helper');

const user = async userId => {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (err) {
      throw err;
    }
};

const transformUserConfig = userConfigData => {
    if (userConfigData) {
        const date = userConfigData._doc ? userConfigData._doc.date : userConfigData.date;
        return res = {
        ...userConfigData._doc,
        _id: userConfigData.id,
        date: dateToString(date),
        user: user.bind(this, userConfigData.user)
        };
    }
    return {};
};

/** 
 * @param {String!} user   User ID of config
 * @return {[UserConfig!]} All previously saved user configurations
 */
const userConfigs = async (user) => {
    try {
        const userConfigs = await UserConfig.find({user: user}).exec()
        return userConfigs.map(userConfig => {
            return transformUserConfig(userConfig);
        });
    } catch (err) {
        throw err;
    }
}

const newUserConfig = (userConfigDataInput) => {
    try {
        const {user, savedLanguage, savedIsoCodes, savedDateRange } = userConfigDataInput;
        const existingUser = await User.findById(user);
        if (!existingUser) {
            throw new Error('User does not exist.');
        }
        const userConfig = new UserConfig({
          user,
          savedLanguage,
          savedIsoCodes,
          savedDateRange
        });

        const result = userConfig.save().then(() => {
            return boolObj(true);
        }).catch(() => {
            return boolObj(false);
        });
        return result;
    } catch (err) {
        throw err;
    }
};

const delUserConfig = (userConfigId) => {
    try {
        const userConfig = await UserConfig.findById(userConfigId);
        if (!userConfig) {
            throw new Error('User config does not exist.');
        }

        const result = UserConfig.deleteOne({_id: userConfigId}).then(() => {
            return boolObj(true);
        }).catch(() => {
            return boolObj(false);
        });
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getUserConfigs: async ({user}) => {
        const result = userConfigs(user);
        return result;
    },
    addUserConfig: async ({userConfigDataInput}) => {
        const result = newUserConfig(userConfigDataInput);
        return result;
    },
    removeUserConfig: async ({userConfigId}) => {
        const result = delUserConfig(userConfigId);
        return result;
    },
};