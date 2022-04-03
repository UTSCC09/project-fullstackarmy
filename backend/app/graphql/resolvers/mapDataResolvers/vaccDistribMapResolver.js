const IsoCodeVaccSupplyData = require('../../../models/IsoCodeVaccSupplyData');
const mapDataHelpers = require('./mapDataHelper');

const distribMapData = async () => {

  // ! have to check if this is true for this query
  // Create map object here rather than populate the query for
  // time efficiency
  const idToIsoCode = await mapDataHelpers.idToIsoCodeQuery(forCountry = true);

  const query = await IsoCodeVaccSupplyData.find({}).select({
    isoCode: 1,
    dosesDeliveredRequiredPercent: 1,
    dosesExpectedRequiredPercent: 1,
  });

  const result = query.map(isoCodeData => {
    return {
      isoCode: idToIsoCode[isoCodeData.isoCode],
      dosesDeliveredRequiredPercent: isoCodeData.dosesDeliveredRequiredPercent,
      dosesExpectedRequiredPercent: isoCodeData.dosesExpectedRequiredPercent,
    };
  });

  return result;
}

module.exports = {
  countryVaccDistribMapData: async () => {
    const result = distribMapData();
    return result;
  }
};