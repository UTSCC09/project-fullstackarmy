const IsoCodeDataPipeline = require('./dataPipelineResolvers/IsoCodeDataPipeline');
const IsoCodeVaccDataPipeline = require('./dataPipelineResolvers/IsoCodeVaccDataPipeline');

const rootResolver = {
  ...IsoCodeDataPipeline,
  ...IsoCodeVaccDataPipeline,
  // ...countryResolver,
  // ...countryIncomeLevelResolver,
};

module.exports = rootResolver;