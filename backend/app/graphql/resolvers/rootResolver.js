const IsoCodeDataPipeline = require('./dataPipelineResolvers/IsoCodeDataPipeline');
const IsoCodeVaccDataPipeline = require('./dataPipelineResolvers/IsoCodeVaccDataPipeline');
const IsoCodeResolver = require('./isoCodeResolver');
const DailyVaccDataResolver = require('./dailyVaccDataResolver');
const rootResolver = {
  ...IsoCodeDataPipeline,
  ...IsoCodeVaccDataPipeline,
  ...IsoCodeResolver,
  ...DailyVaccDataResolver,
};

module.exports = rootResolver;