const dataPipelineConstants = require('../../../dataPipeline/dataPipelineConstants');
const IsoCode = require('../../../models/IsoCode');
const resolverHelpers = require('../helper');

const nonCountryIsoCodes = Object.keys(dataPipelineConstants.isoCodeToTypes);
const continentIsoCodes = dataPipelineConstants.continentIsoCodes;

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
        idToIsoCode[isoCodeData.id] = isoCodeData.isoCode;
      });

      return idToIsoCode;
    })
    .catch((err) => {
      resolverHelpers.unexpectedError(err);
    });

  return query;
};

// process the result of the promises/queries
const processMapDataQueries = async (mapDataQueries, metric, idToIsoCode) => {
  const result = await Promise.all(mapDataQueries)
    .then((res) => {
      let result = [];
      res.forEach((isoCodeData) => {
        if (isoCodeData) {
          // Some isoCodes will not have any data in the date range
          let row = {
            isoCode: idToIsoCode[isoCodeData.isoCode], // isoCode here is the foreign key id
            isoCodeName: isoCodeData.isoCodeName,
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
