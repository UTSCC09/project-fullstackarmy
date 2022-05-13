// Pipeline
const IsoCodeDataPipeline = require("./dataPipelineResolvers/IsoCodeDataPipeline");
const IsoCodeVaccDataPipeline = require("./dataPipelineResolvers/IsoCodeVaccDataPipeline");
const IsoCodeVaccSupplyDataPipeline = require("./dataPipelineResolvers/IsoCodeVaccSupplyDataPipeline");
const DataPipelineLogs = require("./dataPipelineResolvers/DataPipelineLogs");

// Exposed API's
const IsoCodeResolver = require("./isoCodeResolver");
const DailyVaccDataResolver = require("./dailyVaccDataResolver");
const SupplyVaccDataResolver = require("./demandDataResolver");
const VaccStatusMapResolver = require("./mapDataResolvers/vaccStatusMapResolver");
const VaccDistribMapResolver = require("./mapDataResolvers/vaccDistribMapResolver");

// Sign-in/Sign-Up and Saved Configs
const AuthorizationResolver = require("./userConfigResolvers/authorization");
const UserConfigResolver = require("./userConfigResolvers/userConfig");

const rootResolver = {
  // Pipeline
  ...IsoCodeDataPipeline,
  ...IsoCodeVaccDataPipeline,
  ...IsoCodeVaccSupplyDataPipeline,
  ...DataPipelineLogs,

  // Exposed API's
  ...IsoCodeResolver,
  ...DailyVaccDataResolver,
  ...SupplyVaccDataResolver,
  ...VaccStatusMapResolver,
  ...VaccDistribMapResolver,

  // Sign-in/Sign-Up and Saved Configs
  ...AuthorizationResolver,
  ...UserConfigResolver,
};

module.exports = rootResolver;
