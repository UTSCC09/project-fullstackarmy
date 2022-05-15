const dataPipelineConstants = require('../../../dataPipeline/dataPipelineConstants');
const IsoCode = require('../../../models/IsoCode');
const resolverHelpers = require('../helper');

const nonCountryIsoCodes = Object.keys(dataPipelineConstants.isoCodeToTypes);
const continentIsoCodes = dataPipelineConstants.continentIsoCodes;

/**
 * Maps Ids to IsoCodes
 * @summary Makes a query to the database to get the isoCode and isoCodeName for each id, these are already known constants that are
 * used in generating the database in the first place, therefore these
 * @param {boolean} forCountry - if the data retrieved is for countries or continents
 * @return {{int: {isoCode: string, isoCodeName: string}}} - an object with the id as the key and the isoCode and isoCodeName as the value
 * @author Mohamed Tayeh
 */
const idToIsoCodeQuery = async (forCountry) => {
  let isoCodeQuery;

  if (forCountry) {
    isoCodeQuery = { $nin: nonCountryIsoCodes };
  } else {
    isoCodeQuery = { $in: continentIsoCodes };
  }

  const query = await IsoCode.find({
    isoCode: isoCodeQuery,
  })
    .select({
      id: 1,
      isoCode: 1,
      isoCodeName: 1,
    })
    .then((res) => {
      let idToIsoCode = {};

      res.forEach((isoCodeData) => {
        idToIsoCode[isoCodeData.id] = {
          isoCode: isoCodeData.isoCode,
          isoCodeName: isoCodeData.isoCodeName,
        };
      });

      return idToIsoCode;
    })
    .catch((err) => {
      resolverHelpers.unexpectedError(err);
    });

  return query;
};

/**
 * General helper that processes the map data queries and adds isoCode information to each row, such as isoCode and isoCodeName
 * @param {array of queries/promises} mapDataQueries - array of map data queries
 * @param {string} metric - the name of the metric in the query
 * @param {{int: {isoCode: string, isoCodeName: string}}} idToIsoCode - an object with the id as the key and the isoCode and isoCodeName as the value
 * @return {{isoCode: string, isoCodeName: string, 'metric': string}[]} metric is based on the above parameter
 * @author Mohamed Tayeh
 */
const processMapDataQueries = async (mapDataQueries, metric, idToIsoCode) => {
  const result = await Promise.all(mapDataQueries)
    .then((res) => {
      let result = [];
      res.forEach((isoCodeData) => {
        if (isoCodeData) {
          // Some isoCodes will not have any data in the date range
          let isoCodeInfo = idToIsoCode[isoCodeData.isoCode];

          let row = {
            isoCode: isoCodeInfo.isoCode, // isoCode here is the foreign key id
            isoCodeName: isoCodeInfo.isoCodeName,
          };

          row[metric] = isoCodeData[metric];
          result.push(row);
        }
      });

      return result;
    })
    .catch((err) => {
      resolverHelpers.unexpectedError(err);
    });

  return result;
};

exports.idToIsoCodeQuery = idToIsoCodeQuery;
exports.processMapDataQueries = processMapDataQueries;
