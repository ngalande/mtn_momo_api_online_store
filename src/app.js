const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
//-------------------------------------
const momo = require("mtn-momo");
require('dot-env')

const { Collections } = momo.create({
  callbackHost: ""
});

const collections = Collections({
  userSecret: "",
  userId: "",
  primaryKey: ""
});


//-------------------------------------
//get request
app.get('/', function (req, res) {
  res.send('Test for online store is working')
  // Request to pay
    
})
//Post request to request to pay
app.post('/reqtopay', function(req, res){
    const jsonBody = req.body;
    // console.log(jsonBody)
    // Request to pay
    collections
    .requestToPay({
    amount: jsonBody.amount,
    currency: jsonBody.currency,
    externalId: jsonBody.externalId,
    payer: {
        partyIdType: jsonBody.payer.partyIdType,
        partyId: jsonBody.payer.partyId
    },
    payerMessage: jsonBody.payerMessage,
    payeeNote: jsonBody.payeeNote
    })
    .then(transactionId => {
    console.log({ transactionId });

    // Get transaction status
    return collections.getTransaction(transactionId);
    })
    .then(transaction => {
        console.log({ transaction });
    })
    res.send('Request to pay sent successfully')
})
app.listen(3000)