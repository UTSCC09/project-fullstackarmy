const countryResolver = require('./country');
const countryIncomeLevelResolver = require('./country-income-level');

const rootResolver = {
  ...countryResolver,
  ...countryIncomeLevelResolver,
};

module.exports = rootResolver;