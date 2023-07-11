const web3Accounts = require('web3-eth-accounts');
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
    "0x6C3a074818be2bf372bE9E74A2527cB3DF9771Df": 100,
    "0x68b05b9adF0420FdE7C50e75B8953a4224b4DCF5": 50,
};

app.get("/balance/:address", (req, res) => {
    const {address} = req.params;
    const balance = balances[address] || 0;
    res.send({balance});
});

app.post("/send", (req, res) => {
    const {sender, recipient, amount, signature} = req.body;

    setInitialBalance(sender);
    setInitialBalance(recipient);

    const transaction = JSON.stringify({
        sendAmount: amount, recipient: recipient, senderBalance: balances[sender],
    });
    const recovered_sender = web3Accounts.recover(transaction, signature)

    if (balances[sender] < amount) {
        res.status(400).send({message: "Not enough funds!"});
    } else if (sender === recovered_sender) {
        balances[sender] -= amount;
        balances[recipient] += amount;
        res.send({balance: balances[sender]});
    } else {
        res.status(400).send({message: "Signature not valid for this transaction."})
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}