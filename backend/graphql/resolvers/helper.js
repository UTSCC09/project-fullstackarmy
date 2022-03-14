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
    return {
      ...isoCode._doc,
      _id: isoCode.id,
      isoCodeType: isoCodeType.bind(this, isoCode.isoCodeType)
    };
};

const numberObj = (number) => {
    return {number};
}

exports.transformIsoCode = transformIsoCode;
exports.numberObj = numberObj;