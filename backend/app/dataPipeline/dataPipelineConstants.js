// *** Gives isoCode a type to be stored in our DB

const world = "world";
const internationalAggregates = "internationalAggregates";
const continent = "continent";
const incomeLevel = "incomeLevel";
const subRegion = "subRegion";
const country = "country";

const isoCodeToTypes = {
  "OWID_WRL": world,
  "OWID_EUN": internationalAggregates,
  "OWID_AFR": continent,
  "OWID_ASI": continent,
  "OWID_EUR": continent,
  "OWID_NAM": continent,
  "OWID_OCE": continent,
  "OWID_SAM": continent,
  "OWID_HIC": incomeLevel,
  "OWID_LIC": incomeLevel,
  "OWID_LMC": incomeLevel,
  "OWID_UMC": incomeLevel,
  "OWID_ENG": subRegion,
  "OWID_CYN": subRegion,
  "OWID_NIR": subRegion,
  "OWID_SCT": subRegion,
  "OWID_WLS": subRegion
}

exports.world = world;
exports.internationalAggregates = internationalAggregates;
exports.continent = continent;
exports.incomeLevel = incomeLevel;
exports.subRegion = subRegion;
exports.country = country;
exports.isoCodeToTypes = isoCodeToTypes;