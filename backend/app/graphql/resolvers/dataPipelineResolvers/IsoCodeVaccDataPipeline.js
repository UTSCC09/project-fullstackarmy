const IsoCode = require('../../../models/IsoCode');
const IsoCodeVaccData = require('../../../models/IsoCodeVaccData');
const resolverHelpers = require('../helper');

/**
 * Returns all the db queries needed to update the vaccine info
 * @param {IsoCodeData} isoCodeData
 * @param {IsoCodeToID} isoCodeToID
 * @return {[Promise]}
 * @author Mohamed Tayeh
 */
const updateIsoCodeVaccDataQueries = (isoCodeData, isoCodeToID) => {
  let allIsoCodeVaccDataQueries = [];

  isoCodeData.forEach((oneIsoCodeVaccData) => {
    let oneIsoCodeVaccDataQueries = oneIsoCodeVaccData.data.map((dataRow) => {
      const query = {
        date: dataRow.date,
        isoCode: isoCodeToID[oneIsoCodeVaccData.isoCode],
      };

      const update = {
        totalVaccinations: dataRow.totalVaccinations,
        totalVaccinationsPerHundred: dataRow.totalVaccinationsPerHundred,
        peopleVaccinated: dataRow.peopleVaccinated,
        peopleVaccinatedPerHundred: dataRow.peopleVaccinatedPerHundred,
        dailyVaccinationsRaw: dataRow.dailyVaccinationsRaw,
        dailyVaccinations: dataRow.dailyVaccinations,
        dailyVaccinationsPerMillion: dataRow.dailyVaccinationsPerMillion,
        dailyPeopleVaccinated: dataRow.dailyPeopleVaccinated,
        dailyPeopleVaccinatedPerHundred:
          dataRow.dailyPeopleVaccinatedPerHundred,
        peopleFullyVaccinated: dataRow.peopleFullyVaccinated,
        peopleFullyVaccinatedPerHundred:
          dataRow.peopleFullyVaccinatedPerHundred,
        totalBoosters: dataRow.totalBoosters,
        totalBoostersPerHundred: dataRow.totalBoostersPerHundred,
      };

      const options = {
        upsert: true,
      };

      return IsoCodeVaccData.findOneAndUpdate(query, update, options);
    });

    allIsoCodeVaccDataQueries = allIsoCodeVaccDataQueries.concat(
      oneIsoCodeVaccDataQueries
    );
  });

  return allIsoCodeVaccDataQueries;
};

/**
 * Updates the vaccination data for the given data
 * @param {{isoCodeVaccDataInput: IsoCodeVaccDataInput}} args
 * @return {Number} number of records inserted.
 * @author Mohamed Tayeh
 */
module.exports = {
  updateIsoCodeVaccData: async (args) => {
    if (args.username !== process.env.DATA_PIPELINE_USERNAME) {
      throw Error('Unauthorized');
    }

    let isoCodeData = args.isoCodeVaccDataInput;

    // Make a query to get all the isoCodes and their respective id's
    // Waits for the actual value of the promises
    // since the following query depends on this one
    let isoCodeToID = await IsoCode.find({})
      .select({ id: 1, isoCode: 1 })
      .then((res) => {
        let isoCodeToID = {};

        res.forEach((isoCodeRow) => {
          isoCodeToID[isoCodeRow.isoCode] = isoCodeRow.id;
        });

        return isoCodeToID;
      })
      .catch((err) => {
        resolverHelpers.unexpectedError(err);
      });

    let isoCodeVaccDataQueries = updateIsoCodeVaccDataQueries(
      isoCodeData,
      isoCodeToID
    );

    let result = Promise.all(isoCodeVaccDataQueries)
      .then((res) => {
        return resolverHelpers.numberObj(res.length);
      })
      .catch((err) => {
        resolverHelpers.unexpectedError(err);
      });

    // Returning a promise that resolves on its own
    return result;
  },
};
