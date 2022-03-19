const IsoCodeDataPipeline = require('./dataPipelineResolvers/IsoCodeDataPipeline');
const IsoCodeVaccDataPipeline = require('./dataPipelineResolvers/IsoCodeVaccDataPipeline');
const MapData = require('./MapData');

const rootResolver = {
  ...IsoCodeDataPipeline,
  ...IsoCodeVaccDataPipeline,
  ...MapData,
  // ...countryResolver,
  // ...countryIncomeLevelResolver,
};

module.exports = rootResolver;