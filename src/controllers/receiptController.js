const {getInstance} = require( '../db/dbContext')
const db = getInstance("receipt");
const {
    getReceiptById,
    addReceipt} = require('../models/receipts')
const {
    generateRetailNamePoints, 
    generateDollarAmountPoints, 
    checkMultiple, 
    generateItemPoints,
    generateItemDesc,
    generateTimePoints,
    generatePurchaseDatePoint
} =  require('../utils/utils.js');
const processReceipt = async (receipt) =>{
    try{
        const {retailer,purchaseDate, purchaseTime, total, items} = receipt;

        items.forEach((item,idx) => {
            items[idx]= JSON.stringify(item);
        })

        const stringifiedItems = items.join();
        return await addReceipt({retailer,purchaseDate, purchaseTime, total, items:stringifiedItems});
    }
   catch(err){
    console.log(err)
    throw new Error(err);
   }
}

//Needs to be a functioin that returns a promise
const generatePoint = async (receiptId) => {

    const receipt = await getReceiptById(receiptId);
    const {id, retailer,purchaseDate, purchaseTime, total, items} = receipt;
    
    //Generate points on retailer name - 1 point/character
    const retailPoints = generateRetailNamePoints(retailer);
    //Generate points check dollar amount if no cents - 50 points
    const dollarPoints = generateDollarAmountPoints(total);

    //25 points if the total is a multiple of 0.25
    const multiplePoints = checkMultiple(total, .25);

    //5 points for every two items on the receipt
    const itemPoints = generateItemPoints(items);
    /**
     * If the trimmed length of the item description is a multiple of 3, 
     * multiply the price by 0.2 and round up to the nearest integer. 
     * The result is the number of points earned.
     */
    const itemDescPoints = generateItemDesc(items);
    //6 points if the day in the purchase date is odd
    const purchaseDatePoints = generatePurchaseDatePoint(purchaseDate);
    //10 points if the time of purchase is after 2:00pm and before 4:00pm
    const purchaseTimePoints = generateTimePoints(purchaseTime);


    console.log("Retail Points: ", retailPoints);
    console.log("Dollar Points: ", dollarPoints);
    console.log("Multiple Points: ", multiplePoints);
    console.log("Items Points: ", itemPoints);
    console.log("Items Desc Points: ", itemDescPoints);
    console.log("Purchase Date Points: ", purchaseDatePoints);
    console.log("Purchase Time Points: ", purchaseTimePoints);
    console.log("------------------------------");
    console.log("Total: ", retailPoints+dollarPoints+multiplePoints+itemPoints+itemDescPoints+purchaseDatePoints+purchaseTimePoints);
    return retailPoints + dollarPoints + multiplePoints + itemPoints + itemDescPoints + purchaseDatePoints + purchaseTimePoints;
}

module.exports = {processReceipt, generatePoint};