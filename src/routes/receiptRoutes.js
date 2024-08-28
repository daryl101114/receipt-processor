const express = require('express');
const {processReceipt, generatePoint} = require("../controllers/receiptController");
const receiptRouter  = express.Router();
const endpoint = "/receipts"
/** POST */
const addReceipt = async (req, res) =>{
    try{
        const receipt = req.body;
        const result = await processReceipt(receipt);
        console.log(result)
        return res.json({id: result});
    }catch(err){
        console.log(err)
        return res.status(500).send("Failed to process receipt");
    }
}

const getReceiptById = async (req, res) =>{
    try{
        console.log("hit")
        const {id} = req.params;
        const result = await generatePoint(id);
        return res.json({points: result});
    }catch(err){
        console.log(err)
        return res.status(500).send("Failed to process receipt");
    }
}

receiptRouter.get(`${endpoint}/:id/points`,getReceiptById);
receiptRouter.post(`${endpoint}/process`,addReceipt);


module.exports = receiptRouter;