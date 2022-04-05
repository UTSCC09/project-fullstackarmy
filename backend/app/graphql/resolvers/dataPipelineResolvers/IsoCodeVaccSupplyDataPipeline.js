const IsoCode = require('../../../models/IsoCode');
const IsoCodeVaccSupplyData = require('../../../models/IsoCodeVaccSupplyData');
const resolverHelpers = require('../helper');

/** 
* Returns all the db queries needed to update the vaccine info
* @param {IsoCodeData} isoCodeData
* @param {IsoCodeToID} isoCodeToID
* @return {[Promise]} 
* @author Mohamed Tayeh
*/
const updateIsoCodeVaccSupplyDataQueries = (isoCodeData, isoCodeToID) => {

    let allIsoCodeVaccDataQueries = isoCodeData.map(dataRow => {
        const query = {
            isoCode: isoCodeToID[dataRow.isoCode],
        };

        const update = {
            dosesRequiredFor85: dataRow.dosesRequiredFor85,
            dosesExpected: dataRow.dosesExpected,
            dosesDelivered: dataRow.dosesDelivered,
            dosesDeliveredExpectedPercent: dataRow.dosesDeliveredExpectedPercent,
            dosesDeliveredRequiredPercent: dataRow.dosesDeliveredRequiredPercent,
            dosesExpectedRequiredPercent: dataRow.dosesExpectedRequiredPercent
        };
        
        const options = {
            upsert: true,
        };

        return IsoCodeVaccSupplyData.findOneAndUpdate(query, update, options);
    });
    
    return allIsoCodeVaccDataQueries;
}

/** 
* Updates the vaccination data for the given data
* @param {{isoCodeVaccDataInput: IsoCodeVaccDataInput}} args
* @return {Number} number of records inserted.
* @author Mohamed Tayeh
*/
module.exports = {
    updateIsoCodeVaccSupplyData: async (args) => {
        let isoCodeVaccSupplyData = args.isoCodeVaccSupplyDataInput;
        
        // Make a query to get all the isoCodes and their respective id's
        // Waits for the actual value of the promises
        // since the following query depends on this one 
        let isoCodeToID = await IsoCode.find({}).select({id: 1, isoCode: 1}).then(res => {
            
            let isoCodeToID = {}; 
            
            res.forEach(isoCodeRow => {
                isoCodeToID[isoCodeRow.isoCode] = isoCodeRow.id
            })

            return isoCodeToID;
        }).catch(err => {
            resolverHelpers.unexpectedError(err);
        }) 

        let isoCodeVaccSupplyDataQueries = updateIsoCodeVaccSupplyDataQueries(
            isoCodeVaccSupplyData,
            isoCodeToID
        );
    
        let result = Promise.all(isoCodeVaccSupplyDataQueries).then(res => {
            return helper.numberObj(res.length);
        }).catch(err => {
            resolverHelpers.unexpectedError(err);
        })
        
        // Returning a promise that resolves on its own
        return result; 
    }
};