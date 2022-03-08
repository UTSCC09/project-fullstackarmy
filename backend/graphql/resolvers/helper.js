const transformCountry = country => {
    return {
        ...country._doc,
        _id: country.id
    };
};

exports.transformCountry = transformCountry;