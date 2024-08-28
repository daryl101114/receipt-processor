const generateRetailNamePoints = (retailName) => {
    if(typeof retailName !== 'string') return 0;
    let totalPoints = 0;
    let lowerCaseString = retailName.toLowerCase().trim();

    for(let i=0; i<lowerCaseString.length; i++){
        let charCode = lowerCaseString.charCodeAt(i);
        if(
            (charCode > 47 && charCode < 58) ||// numeric (0-9)
            // (charCode > 64 && charCode < 91) ||// upper alpha (A-Z)
            (charCode > 96 && charCode < 123)// lower alpha (a-z)
        ){
            totalPoints += 1
        }
    }

    return totalPoints;
}


const generateDollarAmountPoints = (amount) => {
    var r = /^\$?[0-9]+(\.[0][0])?$/; //Regedit to check for string with .00
    
    return r.test(amount) ? 50 : 0;
}

const checkMultiple = (total, multiple) => {
    if(typeof parseFloat(total) !== 'number') return 0;
    if(parseFloat(total) % multiple === 0){
        return 25;
    }
    return 0;
}

const generateItemPoints = (items) => {
    const itemList = formatItems(items);
    const validItems =  Math.floor(itemList.length/2);
    return validItems * 5;
}
const formatItems = (itemsString) => {
    if(typeof itemsString !== 'string') return itemsString;
    let jsonArray = "[" + itemsString + "]";
    return JSON.parse(jsonArray)
}
const generateItemDesc = (items) => {
    let totalPoints = 0;
    const formatted = formatItems(items);
    formatted.forEach(item => {
        totalPoints += generateDescPoints(item);
    })

    function generateDescPoints({shortDescription, price}){
        const trimmedDesc = shortDescription.trim();

        if(trimmedDesc.length % 3 === 0){
            return Math.ceil(parseFloat(price) * .20);
        }
        return 0;
    }

    return totalPoints
}

const generateTimePoints = (purchaseTime) => {
    // Create Date objects for the start and end times
    let startTime = new Date();
    startTime.setHours(14, 0, 0, 0); // 2:00 PM

    let endTime = new Date();
    endTime.setHours(16, 0, 0, 0); // 4:00 PM
    const daysAndMins = purchaseTime.split(":")

    const time = new Date();
    time.setHours(Number(daysAndMins[0]));
    time.setMinutes(Number(daysAndMins[1]))
    time.setSeconds(0); // Set seconds to 0 for comparison
    time.setMilliseconds(0); // Set milliseconds to 0 for

    if (time >= startTime && time <= endTime) {
        return 10;
    } else {
        return 0;
    }

}

const generatePurchaseDatePoint = (purchaseDate) => {
   // Create a Date object for "2022-01-01" in UTC
   const newDate = new Date(purchaseDate);
    let dayOfMonth = newDate.getUTCDate();
    return dayOfMonth % 2 === 0 ? 0 : 6;
}

module.exports = {
    generateRetailNamePoints, 
    generateDollarAmountPoints, 
    checkMultiple, 
    generateItemPoints,
    generateItemDesc,
    generateTimePoints,
    generatePurchaseDatePoint
}