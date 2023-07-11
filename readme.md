## Project 1 Goal: ECDSA

This project begins with a client that is allowed to transfer any funds from any account to another account. That's not very secure. By applying digital signatures we can require that only the user with the appropriate private key can create a signature that will allow them to move funds from one account to the other. Then, the server can verify the signature to move funds from one account to another.
- Incorporate Public Key Cryptography so transfers can only be completed with a valid signature 
- The person sending the transaction should have to verify that they own the private key corresponding to the address that is sending funds

### My solution

Implement an offline script `/server/scripts/signTransactionsOffline.js` which allows a user to sign a message with the transaction info included:
- recipient wallet address
- amount to transfer
- sender's current wallet balance (to prevent replay attack, see below)

The server can recreate this object and check the signature was created using the sender's private key (recover key from signature).

If someone were to intercept the signature, they might be able to replay a transaction with these same details (they wouldn't be able to change the sender/receiver/amount), but by including the sender's balance, once the transaction is completed it's unlikely the sender's balance would now match therefore the signature would not match and a transaction could not be completed.
Additionally, in a real use case, information from the blockchain could be included in the object, which would also prevent replay attacks.

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
