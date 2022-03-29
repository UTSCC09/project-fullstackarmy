const IsoCodeType = require('../../models/IsoCodeType');

const isoCodeType = async isoCodeTypeId => {
    try {
      const isoCodeType = await IsoCodeType.findById(isoCodeTypeId);
      return {
        ...isoCodeType._doc,
        _id: isoCodeType.id,
      };
    } catch (err) {
      throw err;
    }
};

const transformIsoCode = isoCode => {
    if (isoCode) {
      // adding in __order doesn't allow for the spread operator       
      return {
        isoCode: isoCode.isoCode,
        isoCodeName: isoCode.isoCodeName,
        _id: isoCode.id,
        isoCodeType: isoCodeType.bind(this, isoCode.isoCodeType)
      };
    }
    return {};
};

const numberObj = (number) => {
    return {number};
}

const boolObj = (bool) => {
    return {bool};
}

const dateToString = (date) => {
    return new Date(date).toISOString();
}

exports.transformIsoCode = transformIsoCode;
exports.numberObj = numberObj;
exports.boolObj = boolObj;
exports.dateToString = dateToString;
