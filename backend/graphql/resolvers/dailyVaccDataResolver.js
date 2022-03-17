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
    if (dailyVaccData) {
        const date = dailyVaccData._doc ? dailyVaccData._doc.date : dailyVaccData.date;
        return res = {
        ...dailyVaccData._doc,
        _id: dailyVaccData.id,
        date: dateToString(date),
        isoCode: isoCode.bind(this, dailyVaccData.isoCode)
        };
    }
    return {};
};

// JUSTIFICATION: Can't have inclusive either/or in schema, it's better to split them
module.exports = {
    /** 
    * @param {{"isoCodes": [String!]!}} args   Array of ISO Codes
    * @return {[DailyVaccData!]!} most recent first vaccination data for given ISO Codes
    */
    getMostRecentFirstVaccDataByIsoCode: async (args) => {
        try {
            // Since need to get most recent per isoCode, need to call per isoCode
            let dailyVaccData = [];
            for (let i in args.isoCodes) {
                // get the ids of the isoCode
                const isoCodeId = await IsoCode.find({'isoCode': args.isoCodes[i]}, '_id').exec();
                // look up the data
                const mostRecentFirstDose = await DailyVaccData
                .findOne({$and: 
                    [{'isoCode': isoCodeId},
                    {'peopleVaccinatedPerHundred': { $ne: null }},
                ]})
                .sort({date: -1})
                .exec();
                dailyVaccData.push(mostRecentFirstDose);
            }
            return dailyVaccData.map(dailyVaccData => {
                return transformDailyVaccData(dailyVaccData);
            });
        } catch (err) {
            throw err;
        }
    },
    /** 
    * @param {{"isoCodes": [String!]!}} args   Array of ISO Codes
    * @return {[DailyVaccData!]!} most recent second vaccination data for given ISO Codes
    */
     getMostRecentFullyVaccDataByIsoCode: async (args) => {
        try {
            // Since need to get most recent per isoCode, need to call per isoCode
            let dailyVaccData = [];
            for (let i in args.isoCodes) {
                // get the id of the isoCode
                const isoCodeId = await IsoCode.find({'isoCode': args.isoCodes[i]}, '_id').exec();
                // look up the data
                const mostRecentSecondDose = await DailyVaccData
                .findOne({$and: 
                    [{'isoCode': isoCodeId},
                    {'peopleFullyVaccinatedPerHundred': { $ne: null }},
                ]})
                .sort({date: -1})
                .exec();
                dailyVaccData.push(mostRecentSecondDose);
            }
            return dailyVaccData.map(dailyVaccData => {
                return transformDailyVaccData(dailyVaccData);
            });
        } catch (err) {
            throw err;
        }
    },
    /** 
    * @param {{"isoCodes": [String!]!}} args   Array of ISO Codes
    * @return {[DailyVaccData!]!} most recent booster vaccination data for given ISO Codes
    */
     getMostRecentBoosterVaccDataByIsoCode: async (args) => {
        try {
            // Since need to get most recent per isoCode, need to call per isoCode
            let dailyVaccData = [];
            for (let i in args.isoCodes) {
                // get the id of the isoCode
                const isoCodeId = await IsoCode.find({'isoCode': args.isoCodes[i]}, '_id').exec();
                // look up the data
                const mostRecentThirdDose = await DailyVaccData
                .findOne({$and: 
                    [{'isoCode': isoCodeId},
                    {'totalBoostersPerHundred': { $ne: null }},
                ]})
                .sort({date: -1})
                .exec();
                dailyVaccData.push(mostRecentThirdDose);
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
            // convert the dates
            const startDate = new Date(args.startDate);
            const endDate = new Date(args.endDate);

            // need to get data per isoCode
            let fullyVaccData = [];
            for (let i in args.isoCodes) {
                // get the ids of the isoCode
                const isoCodeId = await IsoCode.find({'isoCode': args.isoCodes[i]}, '_id').exec();
                let middleData = await DailyVaccData
                .find({ $and: [
                    {'isoCode': isoCodeId},
                    {'peopleFullyVaccinatedPerHundred': { $ne: null }},
                    {'date': { $ne: null }},
                    {'date': {$gte: startDate, $lte: endDate}},
                ]})
                .exec();
                middleData = middleData.map(middleData => {
                    return transformDailyVaccData(middleData);
                });
                fullyVaccData.push(middleData);
            }
            return fullyVaccData;

        } catch (err) {
            throw err;
        }
    },
};