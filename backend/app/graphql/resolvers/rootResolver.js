const IsoCodeDataPipeline = require('./dataPipelineResolvers/IsoCodeDataPipeline');
const IsoCodeVaccDataPipeline = require('./dataPipelineResolvers/IsoCodeVaccDataPipeline');
const IsoCodeResolver = require('./isoCodeResolver');
const DailyVaccDataResolver = require('./dailyVaccDataResolver');
const MapDataResolver = require('./mapDataResolver');

const rootResolver = {
  ...IsoCodeDataPipeline,
  ...IsoCodeVaccDataPipeline,
  ...IsoCodeResolver,
  ...DailyVaccDataResolver,
  ...MapDataResolver,
};

module.exports = rootResolver;