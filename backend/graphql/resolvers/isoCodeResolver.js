const IsoCode = require('../../models/IsoCode');
const { transformIsoCode } = require('./helper');

module.exports = {
    /** 
    * @param {{"isoCodes": [String!]!}} args   Array of ISO Codes
    * @return {[IsoCode!]!} all IsoCode data for given ISO Codes
    */
    isoCodes: async (args) => {
        try {
            const isoCodes = await IsoCode.find()
                .where('isoCode').in(args.isoCodes).exec();
            return isoCodes.map(isoCode => {
                return transformIsoCode(isoCode);
            });
        } catch (err) {
            throw err;
        }
    },
};