const dataPipelineConstants = require('../../dataPipeline/dataPipelineConstants');
const IsoCode = require('../../models/IsoCode');
const IsoCodeVaccData = require('../../models/IsoCodeVaccData');

const nonCountryIsoCodes = Object.keys(dataPipelineConstants.isoCodeToTypes);
const continentIsoCodes = dataPipelineConstants.continentIsoCodes;

const idToIsoCodeQuery = async (forCountry) => {

  let isoCodeQuery;

  if (forCountry) {
    isoCodeQuery = {$nin: nonCountryIsoCodes}
  } else {
    isoCodeQuery = {$in: continentIsoCodes}
  }

  const query = await IsoCode.find({
      isoCode: isoCodeQuery
    }).select({
      id: 1,
      isoCode: 1,
    }).then( res => {
      let idToIsoCode = {}; 

      res.forEach(isoCodeData => {
        idToIsoCode[isoCodeData.id] = isoCodeData.isoCode;
      })

      return idToIsoCode;
    }).catch(err => {
      console.log('nonCountryIsoCodesIds');
      throw err;
    })
    
  return query; 
}

// promises/queries of data
const mapVaccDataQueries = async(isoCodeIds, startDataFormatted, endDataFormatted) => {
  
  // query - each must be unique due property naming
  
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
      })
      .select({
        isoCode: 1,
        totalBoostersPerHundred: 1,
      })
      .sort({date: -1});
    });

    return queries;
}

// process the result of the promises/queries
const processMapDataQueries = async (mapDataQueries, metric, idToIsoCode) => {

  const result = await Promise.all(mapDataQueries)
    .then(res => {
      let result = [];
      res.forEach(isoCodeData => {
        
        if (isoCodeData) { // Some isoCodes will not have any data in the date range
          let row = {
            isoCode: idToIsoCode[isoCodeData.isoCode], // isoCode here is the foreign key id
          }

          row[metric] = isoCodeData[metric]
          
          result.push(row);
        }
      })

      return result;
    })
    .catch(err => {
      console.log('VaccDataQueries')
      console.log(err);
      throw err;
    });

  return result;
}

const mapData = async (startDate, endDate, vaccDose, forCountry) => {
  const startDataFormatted = new Date(startDate);
  const endDataFormatted = new Date(endDate);

  // Create map object here rather than populate the query for
  // time efficiency
  const idToIsoCode = await idToIsoCodeQuery(forCountry);

  const isoCodeIds = Object.keys(idToIsoCode);

  let queries;
  let result;

  switch(vaccDose){
    case 'first':
      queries = await mapVaccDataQueries(isoCodeIds, startDataFormatted, endDataFormatted);
      result = await processMapDataQueries(queries, 'peopleVaccinatedPerHundred', idToIsoCode);
      break;
    case 'second':
      queries = await mapFullyVaccDataQueries(isoCodeIds, startDataFormatted, endDataFormatted);
      result = await processMapDataQueries(queries, 'peopleFullyVaccinatedPerHundred', idToIsoCode);
      break;
    case 'booster':
      queries = await mapBoosterVaccDataQueries(isoCodeIds, startDataFormatted, endDataFormatted);
      result = await processMapDataQueries(queries, 'totalBoostersPerHundred', idToIsoCode);      
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