const IsoCodeVaccSupplyData = require('../../../models/IsoCodeVaccSupplyData');
const mapDataHelpers = require('./mapDataHelper');
const resolverHelpers = require('../helper');

const distribMapData = async () => {
  // Create map object here rather than populate the query for
  // time efficiency
  const idToIsoCode = await mapDataHelpers.idToIsoCodeQuery(
    (forCountry = true)
  );

  const query = IsoCodeVaccSupplyData.find({})
    .select({
      isoCode: 1,
      dosesDeliveredRequiredPercent: 1,
      dosesExpectedRequiredPercent: 1,
    })
    .then((res) => {
      return res.map((isoCodeData) => {
        let isoCodeInfo = idToIsoCode[isoCodeData.isoCode];

        return {
          isoCode: isoCodeInfo.isoCode, // isoCode here is the foreign key id
          isoCodeName: isoCodeInfo.isoCodeName,
          dosesDeliveredRequiredPercent:
            isoCodeData.dosesDeliveredRequiredPercent,
          dosesExpectedRequiredPercent:
            isoCodeData.dosesExpectedRequiredPercent,
        };
      });
    })
    .catch((err) => {
      resolverHelpers.unexpectedError(err);
    });

  return query;
};

module.exports = {
  countryVaccDistribMapData: async () => {
    const result = await distribMapData();
    return result;
  },
};
