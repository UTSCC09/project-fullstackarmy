const IsoCode = require('../../models/IsoCode');
const { transformIsoCode } = require('./helper');

module.exports = {
    /** 
    * @param {{"isoCodes": [String!]!}} args   Array of ISO Codes
    * @return {[IsoCode!]!} all IsoCode data for given ISO Codes
    */
    isoCodes: async (args) => {
        try {
            let isoCodes = [];
            for (let i in args.isoCodes){
                const middleData = await IsoCode
                    .findOne({'isoCode': args.isoCodes[i]})
                    .exec();
                isoCodes.push(middleData)
            }
            return isoCodes.map(isoCode => {
                return transformIsoCode(isoCode);
            });
        } catch (err) {
            throw err;
        }
    },
};