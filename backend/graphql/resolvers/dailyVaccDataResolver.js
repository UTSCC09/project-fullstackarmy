const DailyVaccData = require('../../models/IsoCodeVaccData');
const IsoCode = require('../../models/IsoCode');
const { transformIsoCode } = require('./helper');


const isoCode = async isoCodeId => {
    try {
      const isoCodeType = await IsoCode.findById(isoCodeId);
      return {
        ...isoCodeTyp._doc,
        _id: isoCodeType.id,
      };
    } catch (err) {
      throw err;
    }
};

const transformDailyVaccData = dailyVaccData => {
    return {
      ...dailyVaccData._doc,
      _id: dailyVaccData.id,
      date: dateToString(dailyVaccData._doc.date),
      isoCode: isoCode.bind(this, dailyVaccData.isoCode)
    };
};

module.exports = {
    dailyVaccData: async (args) => {
        try {
            // If no list for either isoCodes or dates, return all
            if (!args.isoCodes && !args.dates) {
                const dailyVaccData = await DailyVaccData.find();
                return dailyVaccData.map(dailyVaccData => {
                    return transformIsoCode(dailyVaccData);
                });
            // If list is given, then return the isoCodes given in list
            } else if (!args.isoCodes && args.dates) {
                const dailyVaccData = await DailyVaccData.find()
                        .where('date').in(args.isoCodes).exec();
                return isoCodes.map(isoCode => {
                    return transformIsoCode(isoCode);
                });
            }
        } catch (err) {
            throw err;
        }
    },
};