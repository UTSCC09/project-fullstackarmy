const dataPipelineConstants = require('../../dataPipeline/dataPipelineConstants');
const IsoCode = require('../../models/IsoCode');
const IsoCodeVaccData = require('../../models/IsoCodeVaccData');

const nonCountryIsoCodes = Object.keys(dataPipelineConstants.isoCodeToTypes);

// todo see if i can return an object as a result in graphql
const idToIsoCodeQuery = async (isoCodes) => {
  const query = await IsoCode.find({
        isoCode: {$nin: isoCodes}
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
const mapVaccDataQueries = async(countryIsoCodeIds, startDataFormatted, endDataFormatted) => {
    // query - each must be unique due property naming
    const queries = countryIsoCodeIds.map(countryIsoCodeId => {
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

const mapFullyVaccDataQueries = async(countryIsoCodeIds, startDataFormatted, endDataFormatted) => {
    // query - each must be unique due property naming
    const queries = countryIsoCodeIds.map(countryIsoCodeId => {
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

const mapBoosterVaccDataQueries = async(countryIsoCodeIds, startDataFormatted, endDataFormatted) => {
    // query - each must be unique due property naming
    const queries = countryIsoCodeIds.map(countryIsoCodeId => {
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

const countryMapData = async (startDate, endDate, vaccNum) => {
  const startDataFormatted = new Date(startDate);
  const endDataFormatted = new Date(endDate);

  // Create map object here rather than populate the query for
  // time efficiency
  const idToIsoCode = await idToIsoCodeQuery(nonCountryIsoCodes);

  const countryIsoCodeIds = Object.keys(idToIsoCode);

  let queries;
  let result;

  switch(vaccNum){
    case 'first':
      queries = await mapVaccDataQueries(countryIsoCodeIds, startDataFormatted, endDataFormatted);
      result = await processMapDataQueries(queries, 'peopleVaccinatedPerHundred', idToIsoCode);
      break;
    case 'second':
      queries = await mapFullyVaccDataQueries(countryIsoCodeIds, startDataFormatted, endDataFormatted);
      result = await processMapDataQueries(queries, 'peopleFullyVaccinatedPerHundred', idToIsoCode);
      break;
    case 'booster':
      queries = await mapBoosterVaccDataQueries(countryIsoCodeIds, startDataFormatted, endDataFormatted);
      result = await processMapDataQueries(queries, 'totalBoostersPerHundred', idToIsoCode);      
      break;
    default:
      throw Error('vaccBum should be one of: first, second or booster');
  }

  return result; 
}

module.exports = {
  countryVaccMapData: async ({startDate, endDate}) => {
    const result = await countryMapData(startDate, endDate, 'first');
    return result; 
  },
  countryFullyVaccMapData: async ({startDate, endDate}) => {
    const result = await countryMapData(startDate, endDate, 'second');
    return result; 
  },
  countryBoosterVaccMapData: async ({startDate, endDate}) => {
    const result = await countryMapData(startDate, endDate, 'booster');
    return result; 
  }
};