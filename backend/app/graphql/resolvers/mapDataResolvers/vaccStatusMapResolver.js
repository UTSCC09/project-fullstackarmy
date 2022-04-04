const IsoCodeVaccData = require('../../../models/IsoCodeVaccData');
const mapDataHelpers = require('./mapDataHelper');

// promises/queries of data
const mapVaccDataQueries = async(isoCodeIds, startDataFormatted, endDataFormatted) => {
  
  // query - each must be unique due property cannot be null
  const queries = isoCodeIds.map(countryIsoCodeId => {
    return IsoCodeVaccData.findOne({
      date: {$gte: startDataFormatted, $lte: endDataFormatted},
      isoCode: { $eq: countryIsoCodeId },
      peopleVaccinatedPerHundred: {$ne: null}
    })
    .select({
      isoCode: 1,
      peopleVaccinatedPerHundred: 1,
    })
    .sort({date: -1});
  });

  return queries;
}

const mapFullyVaccDataQueries = async(isoCodeIds, startDataFormatted, endDataFormatted) => {
  // query - each must be unique due property naming
  
  const queries = isoCodeIds.map(countryIsoCodeId => {
    return IsoCodeVaccData.findOne({
      date: {$gte: startDataFormatted, $lte: endDataFormatted},
      isoCode: { $eq: countryIsoCodeId },
      peopleFullyVaccinatedPerHundred: {$ne: null}
    })
    .select({
      isoCode: 1,
      peopleFullyVaccinatedPerHundred: 1,
    })
    .sort({date: -1});
  });

  return queries;
}

const mapBoosterVaccDataQueries = async(isoCodeIds, startDataFormatted, endDataFormatted) => {
    // query - each must be unique due property naming
    const queries = isoCodeIds.map(countryIsoCodeId => {
      return IsoCodeVaccData.findOne({
        date: {$gte: startDataFormatted, $lte: endDataFormatted},
        isoCode: { $eq: countryIsoCodeId },
        totalBoostersPerHundred: {$ne: null}
      }).select({
        isoCode: 1,
        totalBoostersPerHundred: 1,
      }).sort({date: -1});

    });

    return queries;
}

const mapData = async (startDate, endDate, vaccDose, forCountry) => {
  const startDataFormatted = new Date(startDate);
  const endDataFormatted = new Date(endDate);

  // Create map object here rather than populate the query for
  // time efficiency
  const idToIsoCode = await mapDataHelpers.idToIsoCodeQuery(forCountry);

  const isoCodeIds = Object.keys(idToIsoCode);

  let queries;
  let result;

  switch(vaccDose){
    case 'first':
      queries = await mapVaccDataQueries(isoCodeIds, startDataFormatted, endDataFormatted);
      result = await mapDataHelpers.processMapDataQueries(queries, 'peopleVaccinatedPerHundred', idToIsoCode);
      break;
    case 'second':
      queries = await mapFullyVaccDataQueries(isoCodeIds, startDataFormatted, endDataFormatted);
      result = await mapDataHelpers.processMapDataQueries(queries, 'peopleFullyVaccinatedPerHundred', idToIsoCode);
      break;
    case 'booster':
      queries = await mapBoosterVaccDataQueries(isoCodeIds, startDataFormatted, endDataFormatted);
      result = await mapDataHelpers.processMapDataQueries(queries, 'totalBoostersPerHundred', idToIsoCode);      
      break;
    default:
      throw Error('vaccBum should be one of: first, second or booster');
  }

  return result; 
}

module.exports = {
  countryVaccMapData: async ({startDate, endDate}) => {
    const result = await mapData(startDate, endDate, vaccDose='first', forCountry=true);
    return result; 
  },
  countryFullyVaccMapData: async ({startDate, endDate}) => {
    const result = await mapData(startDate, endDate, vaccDose='second', forCountry=true);
    return result; 
  },
  countryBoosterVaccMapData: async ({startDate, endDate}) => {
    const result = await mapData(startDate, endDate, vaccDose='booster', forCountry=true);
    return result; 
  },
  continentVaccMapData: async ({startDate, endDate}) => {
    const result = await mapData(startDate, endDate, vaccDose='first', forCountry=false);
    return result; 
  },
  continentFullyVaccMapData: async ({startDate, endDate}) => {
    const result = await mapData(startDate, endDate, vaccDose='second', forCountry=false);
    return result; 
  },
  continentBoosterVaccMapData: async ({startDate, endDate}) => {
    const result = await mapData(startDate, endDate, vaccDose='booster', forCountry=false);
    return result; 
  }
};