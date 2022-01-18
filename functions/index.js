const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51K0CzcJPXcekda1QHE4WIe9nKOh0AfbJqAQo2EEOs6RbVdVNNmvKDpl4SK3ix8ZwDOK2xmWnv6kUUiPDrXXlLbWu00h6Ss71n1');

// API

// App config
const app = express();
// middleware
app.use(cors({origin: true}));
app.use(express.json());
// API routes
app.get("/", (req, res) => res.status(200).send("Hello CP"));
app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    console.log("payment Request Received for this", total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    })
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
});
// listen command
exports.api = functions.https.onRequest(app);
