/**
 * 
 * Plan for how to update info on the isoCodes
 * 
 * 
 * vacc data has all the isoCodes
 * 
 * income data has country isoCodes, income levels and year
 * 
 * 
 * goal is to merge both into one data structure
 * 
 * data structure:
 * list of objects in the countryIncomeLevel + isoCodeType + isoCodes that are not in 
 * 
 * 
 * 
 * 
 * either way need to .map through incomeLevel to add the isoCodeType
 * 
 * need to .map through the vacc data to add the isoCodeTypes, 
 * if country then remove it from the list
 * 
 * that's it
 * 
 * goal to make both with O(n) then just concatenate them
 * 
 * 
 */

/**
 * 
 * on the backend
 * 
 * gets all the income levels + isoCodeTypes
 * 
 * updates both income levels + isoCodeTypes
 * 
 * updates the rel of the isoCode with both and that's it
 *
 */