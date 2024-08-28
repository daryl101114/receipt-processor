const {getInstance} = require( './db/dbContext.js');
const express = require('express');
const receiptRouter = require('./routes/receiptRoutes.js');
const {getReceipts}= require('./models/receipts.js');


const app = express()
const port = process.env.SERVER_PORT || 3000

//Connect to the database
const db = getInstance("index");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Routes
app.use(receiptRouter);
app.get('/', async (req, res) => {
  try{
    const receipts = await getReceipts();
    res.send({receipts})
  }
  catch(err){
    res.status(500).send()
  }
    
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})