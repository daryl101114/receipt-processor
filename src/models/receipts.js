const {getInstance} = require( '../db/dbContext')
const db = getInstance("receipt");

const MM = {
        "retailer": "M&M Corner Market",
        "purchaseDate": "2022-03-20",
        "purchaseTime": "14:33",
        "items": [
          {
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          }
        ],
        "total": "9.00"
}

const testMM = {"retailer":"M&M Corner Market",
        "purchaseDate":"2022-03-20",
        "purchaseTime":"14:33",
        "total":"9.00",
        "items":"{\"shortDescription\":\"Gatorade\",\"price\":\"2.25\"},{\"shortDescription\":\"Gatorade\",\"price\":\"2.25\"},{\"shortDescription\":\"Gatorade\",\"price\":\"2.25\"},{\"shortDescription\":\"Gatorade\",\"price\":\"2.25\"}"}
const target = {
        "retailer": "Target",
        "purchaseDate": "2022-01-01",
        "purchaseTime": "13:01",
        "items": [
          {
            "shortDescription": "Mountain Dew 12PK",
            "price": "6.49"
          },{
            "shortDescription": "Emils Cheese Pizza",
            "price": "12.25"
          },{
            "shortDescription": "Knorr Creamy Chicken",
            "price": "1.26"
          },{
            "shortDescription": "Doritos Nacho Cheese",
            "price": "3.35"
          },{
            "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
            "price": "12.00"
          }
        ],
        "total": "35.35"
    }
const target2 = {
        "retailer": "Target",
        "purchaseDate": "2022-01-02",
        "purchaseTime": "13:13",
        "total": "1.25",
        "items": [
            {"shortDescription": "Pepsi - 12-oz", "price": "1.25"}
        ]
}
const wallgreens = {
        "retailer": "Walgreens",
        "purchaseDate": "2022-01-02",
        "purchaseTime": "08:13",
        "total": "2.65",
        "items": [
            {"shortDescription": "Pepsi - 12-oz", "price": "1.25"},
            {"shortDescription": "Dasani", "price": "1.40"}
        ]
}

function addReceipt(receipt){
    const {retailer,purchaseDate, purchaseTime, total, items} = receipt
    console.log(items)
    const sql = `INSERT INTO receipts (retailer, purchaseDate, purchaseTime, total, items) VALUES(?,?,?,?,?)`
    return new Promise((resolve, reject)=> {
        db.run(sql, [retailer,purchaseDate,purchaseTime,total,items], function(err) {
            if (err) {
              reject(err);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
           resolve(this.lastID);
          })
    })

}

function getReceiptById(receiptId) {
        const sql = 'Select * from receipts where id = ?'
        return new Promise((resolve, reject) => {
            let result = {};
            db.get(sql, [receiptId], (err, row)=>{
                result = {...row}
                if(err){
                    console.log("hits", err)
                    reject(err);
                }
                resolve (result);
            })
        });
 }

    module.exports = {MM, testMM, target, target2, wallgreens, getReceiptById, addReceipt}