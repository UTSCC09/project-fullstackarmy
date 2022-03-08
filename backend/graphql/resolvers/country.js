const Country = require('../../models/country');

// const { transformCountry } = require('./helper');

const transformCountry = country => {
    return {
        ...country._doc,
        _id: country.id
    };
};

module.exports = {
    countries: async () => {
        try {
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
        iso_code: args.countryInput.iso_code,
        country_name: args.countryInput.country_name
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