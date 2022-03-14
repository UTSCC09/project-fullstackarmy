const IsoCode = require('../../models/IsoCode');
const { transformIsoCode } = require('./helper');


module.exports = {
    isoCodes: async (args) => {
        try {
            // If no list is given then return all the isoCodes
            if (!args.isoCodes) {
                const isoCodes = await IsoCode.find();
                return isoCodes.map(isoCode => {
                    return transformIsoCode(isoCode);
                });
            // If list is given, then return the isoCodes given in list
            } else {
                const isoCodes = await IsoCode.find()
                        .where('isoCode').in(args.isoCodes).exec();
                return isoCodes.map(isoCode => {
                    return transformIsoCode(isoCode);
                });
            }
        } catch (err) {
            throw err;
        }
    },
};