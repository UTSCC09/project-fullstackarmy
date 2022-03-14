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
            console.log(args);
            // get the ids of the isoCodes
            const isoCodeIds = await IsoCode.find({}, '_id')
                .where('isoCode').in(args.isoCodes).then();
            console.log(isoCodeIds);
            let dailyVaccData = [];
            for (let obj in isoCodeIds) {
                const middleData = await DailyVaccData.find({'isoCode': obj._id})
                .sort({date: -1})
                .limit(1)
                .exec();
                dailyVaccData.push(middleData);
            }
            return;
            // // TODO: Can't get multiple most recents
            // return dailyVaccData.map(dailyVaccData => {
            //     return transformDailyVaccData(dailyVaccData);
            // });
        } catch (err) {
            throw err;
        }
    },
    /** 
    * @param {{"startDate": String!, "endDate": String!}} args   starting and end date of range. end date non-inclusive
    * @return {[DailyVaccData!]!} all vaccination data for given date range
    */
    getDailyVaccDataByDateRange: async (args) => {
        try {
            
        } catch (err) {
            throw err;
        }
    },
    getDailyVaccDataByIsoCodeAndDate: (args) => {
        // try {
        //     // get the actual isoCodes and not just their ids
        //     const isoCodes = await IsoCode.find({isoCode:1})
        //         .where('_id').in(args.isoCodes).exec();
        //     console.log(isoCodes);
        //     const dailyVaccData = await DailyVaccData.find()
        //                 .where('isoCode').in(isoCodes).exec();
        //     return dailyVaccData.map(dailyVaccData => {
        //         return transformDailyVaccData(dailyVaccData);
        //     });
        // } catch (err) {
        //     throw err;
        // }
    },
};