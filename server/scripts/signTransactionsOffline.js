const web3Accounts = require('web3-eth-accounts');
const prompt = require('prompt-sync')();

// const sender = Accounts.create();  // Use this to create a new wallet, if no private key is known.

// const example_sender = web3Accounts.privateKeyToAccount('0x327a2d20601f7caf7020651c49ec96e32d5837079da348f8ca0d3cb80803ec00')
// const example_recipient = web3Accounts.privateKeyToAccount('0x60aec50386b02646814573f33324520b5ee2f10c7d816f503c2ccc20dc3aee11')

// console.log(example_sender);
// wallet addr: 0x6C3a074818be2bf372bE9E74A2527cB3DF9771Df
// private key: 0x327a2d20601f7caf7020651c49ec96e32d5837079da348f8ca0d3cb80803ec00

// console.log(example_recipient);
// wallet addr: 0x68b05b9adF0420FdE7C50e75B8953a4224b4DCF5
// private key: 0x60aec50386b02646814573f33324520b5ee2f10c7d816f503c2ccc20dc3aee11

const sender_addr = prompt("What is your private key? (Don't use a real key... dev use only!): ");
const recipient = prompt('Which wallet are you sending to? ');
const sendAmount = parseInt(prompt('How much do you want to send? '));
const senderBalance = parseInt(prompt('Enter your current balance (to protect against replays): '));

const sender = web3Accounts.privateKeyToAccount(sender_addr)

const transaction = {
    sendAmount: sendAmount,
    recipient: recipient,
    senderBalance: senderBalance,
}

const signed_transaction = sender.sign(JSON.stringify(transaction))
console.log(signed_transaction)
console.log("Copy/paste the signature into the 'Send Transaction' input on the front end.")
