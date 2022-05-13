const IsoCodeVaccSupplyData = require('../../models/IsoCodeVaccSupplyData');
const IsoCode = require("../../models/IsoCode");
const resolverHelpers = require("./helper");

module.exports = {
    /**
   * @param {{"isoCodes": [String!]!}} args   Array of ISO Codes
   * @return {[VaccSupplyData!]!} most recent first vaccination data for given ISO Codes
   */
     getSupplyDataByIsoCode: async (args) => {
        try {
          // Use aggregation to maintain order of isoCodeIds, order in pipeline matters
          const pipeline = [
            { $match: { isoCode: { $in: args.isoCodes } } },
            {
              $addFields: {
                __order: { $indexOfArray: [args.isoCodes, "$isoCode"] },
              },
            },
            { $sort: { __order: 1 } },
            { $project: { _id: 1 } },
          ];
          const isoCodeIds = await IsoCode.aggregate(pipeline).exec();
          // Gather the promise-like queries
          const query = isoCodeIds.map((isoCodeId) => {
            return IsoCodeVaccSupplyData.findOne({
              $and: [
                { isoCode: isoCodeId },
                { dosesDeliveredRequiredPercent: { $ne: null } },
                { dosesExpectedRequiredPercent: { $ne: null } },
              ],
            });
          });
          // Then call them all at once with a single await.
          const data = await Promise.all(query).catch((err) => {
            resolverHelpers.unexpectedError(err);
          });
          return data.map((data) => {
            if (data) return data;
            return {};
          });
        } catch (err) {
          resolverHelpers.unexpectedError(err);
        }
      },
};