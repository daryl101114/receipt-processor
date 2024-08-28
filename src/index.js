const {getInstance} = require( './db/dbContext.js')
const express = require('express')
const receiptRouter = require('./routes/receiptRoutes.js');


const app = express()
const port = 3000

//Connect to the database
const db = getInstance("index");

db.run("CREATE TABLE IF NOT EXISTS receipts (id INTEGER PRIMARY KEY, retailer TEXT, purchaseDate TEXT, purchaseTime TEXT, total TEXT, items TEXT)");
function getMembers() {
    return new Promise((resolve, reject) => {
        const members = [];
        db.each('SELECT * FROM receipts', (err, row) => {
            if(err)
                reject(err);
            else {
                members.push({
                    id: row.id,
                    retailer:row.retailer,
                    purchaseDate: row.purchaseDate,
                    purchaseTime: row.purchaseTime,
                    total:row.total,
                    items:row.items
                });
            }
        }, (err, n) => {
            if(err)
                reject(err);
            else {
                resolve(members);
            }
        });
    });
}
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', async (req, res) => {
    const receipts = await getMembers();
  res.send({receipts})
})
app.use(receiptRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})