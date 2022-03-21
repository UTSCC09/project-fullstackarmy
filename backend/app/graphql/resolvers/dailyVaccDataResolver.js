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
            // Use aggregation to maintain order of isoCodeIds, order in pipeline matters
            const pipeline = [
                {$match: {isoCode: {$in: args.isoCodes}}},
                {$addFields: {"__order": {$indexOfArray: [args.isoCodes, "$isoCode" ]}}},
                {$sort: {"__order": 1}},
                {$project: {_id: 1}}
            ];
            const isoCodeIds = await IsoCode.aggregate(pipeline).exec()
            // Gather the promise-like queries
            const firstVaccQueries = isoCodeIds.map(isoCodeId => {
                return DailyVaccData
                .findOne({$and: 
                    [{'isoCode': isoCodeId},
                    {'peopleVaccinatedPerHundred': { $ne: null }},
                ]})
                .sort({date: -1});
            })
            // Then call them all at once with a single await.
            const firstVaccData = await Promise.all(firstVaccQueries)
                .catch(err => {
                    console.log('Retrieving first vaccination data')
                    console.log(err)
                    throw err
                });
            return firstVaccData.map(firstVaccData => {
                return transformDailyVaccData(firstVaccData);
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
            // Use aggregation to maintain order of isoCodeIds, order in pipeline matters
            const pipeline = [
                {$match: {isoCode: {$in: args.isoCodes}}},
                {$addFields: {"__order": {$indexOfArray: [args.isoCodes, "$isoCode" ]}}},
                {$sort: {"__order": 1}},
                {$project: {_id: 1}}
            ];
            const isoCodeIds = await IsoCode.aggregate(pipeline).exec()
            // Gather the promise-like queries
            const fullyVaccQueries = isoCodeIds.map(isoCodeId => {
                return DailyVaccData
                .findOne({$and: 
                    [{'isoCode': isoCodeId},
                    {'peopleFullyVaccinatedPerHundred': { $ne: null }},
                ]})
                .sort({date: -1})
            })
            // Then call them all at once with a single await.
            const fullyVaccData = await Promise.all(fullyVaccQueries)
                .catch(err => {
                    console.log('Retrieving fully vaccinated data')
                    console.log(err)
                    throw err
                });
            return fullyVaccData.map(fullyVaccData => {
                return transformDailyVaccData(fullyVaccData);
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
            // Use aggregation to maintain order of isoCodeIds, order in pipeline matters
            const pipeline = [
                {$match: {isoCode: {$in: args.isoCodes}}},
                {$addFields: {"__order": {$indexOfArray: [args.isoCodes, "$isoCode" ]}}},
                {$sort: {"__order": 1}},
                {$project: {_id: 1}}
            ];
            const isoCodeIds = await IsoCode.aggregate(pipeline).exec()
            // Gather the promise-like queries
            const boosterVaccQueries = isoCodeIds.map(isoCodeId => {
                return DailyVaccData
                .findOne({$and: 
                    [{'isoCode': isoCodeId},
                    {'totalBoostersPerHundred': { $ne: null }},
                ]})
                .sort({date: -1})
            })
            // Then call them all at once with a single await.
            const boosterVaccData = await Promise.all(boosterVaccQueries)
                .catch(err => {
                    console.log('Retrieving booster data')
                    console.log(err)
                    throw err
                });
            return boosterVaccData.map(boosterVaccData => {
                return transformDailyVaccData(boosterVaccData);
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

            // Use aggregation to maintain order of isoCodeIds, order in pipeline matters
            const pipeline = [
                {$match: {isoCode: {$in: args.isoCodes}}},
                {$addFields: {"__order": {$indexOfArray: [args.isoCodes, "$isoCode" ]}}},
                {$sort: {"__order": 1}},
                {$project: {_id: 1}}
            ];
            const isoCodeIds = await IsoCode.aggregate(pipeline).exec()
            // Gather the promise-like queries
            const dailyFullyVaccQueries = isoCodeIds.map(isoCodeId => {
                return DailyVaccData
                    .find({ $and: [
                        {'isoCode': isoCodeId},
                        {'peopleFullyVaccinatedPerHundred': { $ne: null }},
                        {'date': { $ne: null }},
                        {'date': {$gte: startDate, $lte: endDate}},
                    ]})
            });
            // Then call them all at once with a single await.
            const dailyFullyVaccData = await Promise.all(dailyFullyVaccQueries)
                .catch(err => {
                    console.log('Retrieving daily fully vaccinated data')
                    console.log(err)
                    throw err
                });
            // each array is the data for one isoCode, so need to transform per data
            let dailyFullyVaccDataTransformed = []
            for (let i in dailyFullyVaccData){
                let dailyFullyVaccEntry = dailyFullyVaccData[i].map(dailyFullyVaccData => {
                    return transformDailyVaccData(dailyFullyVaccData)
                })
                dailyFullyVaccDataTransformed.push(dailyFullyVaccEntry)
            }
            return dailyFullyVaccDataTransformed;
        } catch (err) {
            throw err;
        }
    },
};