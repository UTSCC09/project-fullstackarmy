const IsoCode = require('../../models/IsoCode');
const { transformIsoCode } = require('./helper');
const dataPipelineConstants = require('../../dataPipeline/helpers/dataPipelineConstants');
const nonCountryIsoCodes = Object.keys(dataPipelineConstants.isoCodeToTypes);
const resolverHelpers = require('./helper');

module.exports = {
  /**
   * @param {{"isoCodes": [String!]!}} args   Array of ISO Codes
   * @return {[IsoCode!]!} all IsoCode data for given ISO Codes
   */
  isoCodes: async (args) => {
    try {
      // From Jyotman Singh https://stackoverflow.com/questions/22797768/does-mongodbs-in-clause-guarantee-order
      // to maintain order need to query one by one
      const pipeline = [
        { $match: { isoCode: { $in: args.isoCodes } } },
        {
          $addFields: {
            __order: { $indexOfArray: [args.isoCodes, '$isoCode'] },
          },
        },
        { $sort: { __order: 1 } },
      ];
      const isoCodes = await IsoCode.aggregate(pipeline).exec();

      return isoCodes.map((isoCode) => {
        return transformIsoCode(isoCode);
      });
    } catch (err) {
      resolverHelpers.unexpectedError(err);
    }
  },
  /**
   * @return {[IsoCode!]!} all IsoCode data corresponding to country ISO Codes
   */
  countryIsoCodes: async () => {
    try {
      const pipeline = [
        { $match: { isoCode: { $nin: nonCountryIsoCodes } } },
        { $sort: { __order: 1 } },
      ];
      const isoCodes = await IsoCode.aggregate(pipeline).exec();
      return isoCodes.map((isoCode) => {
        return transformIsoCode(isoCode);
      });
    } catch (err) {
      resolverHelpers.unexpectedError(err);
    }
  },
};
