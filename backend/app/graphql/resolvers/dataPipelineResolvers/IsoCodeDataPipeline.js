const IsoCode = require('../../../models/IsoCode');
const IsoCodeType = require('../../../models/IsoCodeType');
const IncomeLevel = require('../../../models/IncomeLevel');
const IsoCodeToIncomeLevel = require('../../../models/IsoCodeToIncomeLevel');
const resolverHelpers = require('../helper');

/**
 * Returns queries for updating the different types of isoCodes
 * @param {IsoCodeData} isoCodeData
 * @return {[Promise]} Queries to update the database with income levels
 * @author Mohamed Tayeh
 */
const updateIncomeLevelQueries = (incomeLevels) => {
  let allIncomeLevelQueries = incomeLevels.map((incomeLevel) => {
    const query = { incomeLevel };
    const update = {};
    const options = {
      upsert: true,
      new: true,
    };

    return IncomeLevel.findOneAndUpdate(query, update, options);
  });

  return allIncomeLevelQueries;
};

/**
 * Returns queries for updating the different types of isoCodes
 * @param {IsoCodeData} isoCodeData
 * @return {[Promise]} Queries to update the database
 * @author Mohamed Tayeh
 */
const updateIsoCodeTypes = (isoCodeTypes) => {
  let allIsoCodeTypeQueries = isoCodeTypes.map((isoCodeType) => {
    const query = {
      isoCodeType,
    };

    const update = {};
    const options = {
      upsert: true,
      new: true,
    };

    return IsoCodeType.findOneAndUpdate(query, update, options);
  });

  return allIsoCodeTypeQueries;
};

/**
 * Returns an array of promises to update the IsoCode table with the country data in case of change
 * @param {[{"isoCodeName": String, "isoCode": String, "incomeLevel": dataPoint["Income group"], "year": dataPoint["Year"],}]} countries - isoCodeIncomeLevel data
 * @return {[Mongoose Queries]} List of mongoose queries that are treated as promises
 * @author Mohamed Tayeh
 */
const updateIsoCodeQueries = (isoCodesData, isoCodeTypeToID) => {
  let allIsoCodeQueries = isoCodesData.map((isoCodeData) => {
    const query = { isoCode: isoCodeData.isoCode };
    const update = {
      isoCodeName: isoCodeData.isoCodeName,
      isoCodeType: isoCodeTypeToID[isoCodeData.isoCodeType],
    };

    const options = {
      upsert: true,
      new: true,
    };

    return IsoCode.findOneAndUpdate(query, update, options);
  });

  return allIsoCodeQueries;
};

/**
 * Returns an array of promises to update the IsoCode table with the country data in case of change
 * @param {[{"isoCodeName": String, "isoCode": String, "incomeLevel": dataPoint["Income group"], "year": dataPoint["Year"],}]} isoCodeData - isoCodeIncomeLevel data
 * @param {{str:str}} incomeLevelToID
 * @param {{str:str}} isoCodeToID
 * @return {[Promise]} List of mongoose queries that are treated as promises
 * @author Mohamed Tayeh
 */
const updateIsoCodeIncomeLevelQueries = (
  isoCodeData,
  incomeLevelToID,
  isoCodeToID
) => {
  let allIsoCodeIncomeLevelsQueries = isoCodeData.map((isoCodeIncomeLevel) => {
    const query = {
      year: isoCodeIncomeLevel.year,
      isoCode: isoCodeToID[isoCodeIncomeLevel.isoCode],
    };

    const update = {
      incomeLevel: incomeLevelToID[isoCodeIncomeLevel.incomeLevel],
    };

    const options = {
      upsert: true,
      new: true,
    };

    return IsoCodeToIncomeLevel.findOneAndUpdate(query, update, options);
  });

  return allIsoCodeIncomeLevelsQueries;
};

/**
 * Performs the updates for all the isoCodeData
 * @param {{"isoCodeDataInput": IsoCodeDataInput}}} args
 * @return {Number} number of records inserted for the isoCodeData
 */
module.exports = {
  updateIsoCodeData: async (args) => {
    let isoCodeData = args.isoCodeDataInput;

    let incomeLevels = [];
    let isoCodeTypes = [];

    isoCodeData.forEach((oneIsoCodeData) => {
      let incomeLevel = oneIsoCodeData.incomeLevel;
      let isoCodeType = oneIsoCodeData.isoCodeType;

      if (incomeLevels.indexOf() < 0) {
        incomeLevels.push(incomeLevel);
      }

      if (isoCodeTypes.indexOf() < 0) {
        isoCodeTypes.push(isoCodeType);
      }
    });

    // Removes null values
    incomeLevels = incomeLevels.filter((incomeLevel) => incomeLevel);

    isoCodeTypes.sort();

    let incomeLevelQueries = updateIncomeLevelQueries(incomeLevels);

    let incomeToID = Promise.all(incomeLevelQueries)
      .then((res) => {
        let incomeToID = {};

        res.forEach((incomeLevelRow) => {
          incomeToID[incomeLevelRow.incomeLevel] = incomeLevelRow.id;
        });

        return incomeToID;
      })
      .catch((err) => {
        resolverHelpers.unexpectedError(err);
      });

    let isoCodeTypeQueries = updateIsoCodeTypes(isoCodeTypes);

    let isoCodeTypeToID = Promise.all(isoCodeTypeQueries)
      .then((res) => {
        let isoCodeTypeToID = {};

        res.forEach((isoCodeTypeRow) => {
          isoCodeTypeToID[isoCodeTypeRow.isoCodeType] = isoCodeTypeRow.id;
        });

        return isoCodeTypeToID;
      })
      .catch((err) => {
        resolverHelpers.unexpectedError(err);
      });

    isoCodeTypeToID = await isoCodeTypeToID;

    let isoCodeQueries = updateIsoCodeQueries(isoCodeData, isoCodeTypeToID);

    let isoCodeToID = Promise.all(isoCodeQueries)
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

    // Waits for the actual value of the promises
    // since the following query depends on this one
    incomeToID = await incomeToID;
    isoCodeToID = await isoCodeToID;

    let isoCodeIncomeLevelQuries = updateIsoCodeIncomeLevelQueries(
      isoCodeData,
      incomeToID,
      isoCodeToID
    );

    let result = Promise.all(isoCodeIncomeLevelQuries)
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
