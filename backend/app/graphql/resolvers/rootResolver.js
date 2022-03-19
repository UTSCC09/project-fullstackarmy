const IsoCodeDataPipeline = require('./dataPipelineResolvers/IsoCodeDataPipeline');
const IsoCodeVaccDataPipeline = require('./dataPipelineResolvers/IsoCodeVaccDataPipeline');
const IsoCodeResolver = require('./isoCodeResolver');
const DailyVaccDataResolver = require('./dailyVaccDataResolver');
const MapData = require('./MapData');

const rootResolver = {
  ...IsoCodeDataPipeline,
  ...IsoCodeVaccDataPipeline,
  ...IsoCodeResolver,
  ...DailyVaccDataResolver,
  ...MapData,
};

module.exports = rootResolver;