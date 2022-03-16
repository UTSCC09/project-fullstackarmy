const DailyVaccData = require('../../models/IsoCodeVaccData');
const IsoCode = require('../../models/IsoCode');
const { transformIsoCode, dateToString } = require('./helper');


const isoCode = async isoCodeId => {
    try {
      const isoCode = await IsoCode.findById(isoCodeId);
      return transformIsoCode(isoCode);
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

// JUSTIFICATION: Can't have inclusive either/or in schema, it's better to split them
module.exports = {
    /** 
    * @param {{"isoCodes": [String!]!}} args   Array of ISO Codes
    * @return {[DailyVaccData!]!} most recent vaccination data for given ISO Codes
    */
    getMostRecentVaccDataByIsoCode: async (args) => {
        try {
            // get the ids of the isoCodes
            const isoCodeIds = await IsoCode.find({}, '_id')
                .where('isoCode').in(args.isoCodes).exec();
            // Since need to get most recent per isoCode, need to call per isoCode
            let dailyVaccData = [];
            for (let i in isoCodeIds) {
                const middleData = await DailyVaccData.findOne({'isoCode': isoCodeIds[i]._id, 'peopleFullyVaccinatedPerHundred': { $ne: null } })
                .sort({date: -1})
                .exec();
                dailyVaccData.push(middleData);
            }
            return dailyVaccData.map(dailyVaccData => {
                return transformDailyVaccData(dailyVaccData);
            });
        } catch (err) {
            throw err;
        }
    },
    /** 
    * @param {{"startDate": String!, "endDate": String!, "isoCodes": [String!]!}} args   starting and end date of range. dates inclusive. for isocodes given
    * @return {[DailyVaccData!]!} all vaccination data for given date range and isocodes
    */
     getVaccDataByDateRangeAndIsoCode: async (args) => {
        try {
            // get the ids of the isoCodes
            const isoCodeIds = await IsoCode.find({}, '_id')
                .where('isoCode').in(args.isoCodes).exec();
            // convert the dates
            const startDate = new Date(args.startDate);
            const endDate = new Date(args.endDate);

            // need to get data per isoCode
            let fullyVaccData = []
            for (let i in isoCodeIds) {
                const middleData = await DailyVaccData
                .find({ $and: [
                    {'isoCode': isoCodeIds[i]._id},
                    {'peopleFullyVaccinatedPerHundred': { $ne: null }},
                    {'date': {$gte: startDate, $lte: endDate}},
                ]})
                .exec();
                fullyVaccData.push(middleData);
            }
            return fullyVaccData.map(fullyVaccData => {
                return transformDailyVaccData(fullyVaccData);
            });

        } catch (err) {
            throw err;
        }
    },
};