const IsoCodeDataPipeline = require('./dataPipelineResolvers/IsoCodeDataPipeline');
const IsoCodeVaccDataPipeline = require('./dataPipelineResolvers/IsoCodeVaccDataPipeline');
const IsoCodeResolver = require('./isoCodeResolver');
const rootResolver = {
  ...IsoCodeDataPipeline,
  ...IsoCodeVaccDataPipeline,
  ...IsoCodeResolver,
};

module.exports = rootResolver;