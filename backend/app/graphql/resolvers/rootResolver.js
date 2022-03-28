// Pipeline
const IsoCodeDataPipeline = require('./dataPipelineResolvers/IsoCodeDataPipeline');
const IsoCodeVaccDataPipeline = require('./dataPipelineResolvers/IsoCodeVaccDataPipeline');
const IsoCodeVaccSupplyDataPipeline = require('./dataPipelineResolvers/IsoCodeVaccSupplyDataPipeline');
const DataPipelineLogs = require('./dataPipelineResolvers/DataPipelineLogs');

// Exposed API's
const IsoCodeResolver = require('./isoCodeResolver');
const DailyVaccDataResolver = require('./dailyVaccDataResolver');
const MapDataResolver = require('./mapDataResolver');

const rootResolver = {
  // Pipeline
  ...IsoCodeDataPipeline,
  ...IsoCodeVaccDataPipeline,
  ...IsoCodeVaccSupplyDataPipeline,
  ...DataPipelineLogs,
  
  // Exposed API's
  ...IsoCodeResolver,
  ...DailyVaccDataResolver,
  ...MapDataResolver,
};

module.exports = rootResolver;