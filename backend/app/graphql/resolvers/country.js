const Country = require('../../models/IsoCode');

// ! needs to be refactored
// const { transformCountry } = require('./helper');

const transformCountry = country => {
    return {
        ...country._doc,
        _id: country.id
    };
};

module.exports = {
    country: async () => {
        try {
            // ! Should have pagination etc.
            const countries = await Country.find();
            return countries.map(country => {
                return transformCountry(country);
            });
        } catch (err) {
            throw err;
        }
    },
    getCountryByISOCode: async args => {
        try {
            const country = await Country.find({ iso_code: args.iso_code});
            return transformCountry(country);
        } catch (err) {
            throw err;
        }
    },
    addCountry: async (args, req) => {
        const country = new Country({
            isoCode: args.countryInput.isoCode,
            countryName: args.countryInput.countryName
        });

        try {
            const result = await country.save();
            return transformCountry(result);
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    deleteCountry: async args => {
        try {
            const country = await Country.findById(args.countryId).populate('event');
            await Country.deleteOne({ _id: args.countryId });
            return transformCountry(country);
        } catch (err) {
            throw err;
        }
    }
};