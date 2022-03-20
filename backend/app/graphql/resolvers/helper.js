const transformCountry = country => {
    return {
        ...country._doc,
        _id: country.id
    };
};

const numberObj = (number) => {
    return {number};
}

exports.transformCountry = transformCountry;
exports.numberObj = numberObj;