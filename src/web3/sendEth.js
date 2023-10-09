// const Web3 = require('web3'); // Import the Web3 library

// // Initialize Web3 with your Ethereum node's URL
// const web3 = new Web3('YOUR_ETHEREUM_NODE_URL');

// // Define the sender's private key and receiver's address
// const senderPrivateKey = 'YOUR_SENDER_PRIVATE_KEY';
// const receiverAddress = 'RECEIVER_ETHEREUM_ADDRESS';

// // Function to send Ether from one address to another
// export const sendEther = async (amountInEther) => {
//   try {
//     // Convert the private key to an Ethereum account
//     const senderAccount = web3.eth.accounts.privateKeyToAccount(senderPrivateKey);

//     // Get the sender's nonce (transaction count)
//     const nonce = await web3.eth.getTransactionCount(senderAccount.address, 'pending');

//     // Convert the Ether amount to Wei (1 Ether = 10^18 Wei)
//     const amountInWei = web3.utils.toWei(amountInEther.toString(), 'ether');

//     // Create a transaction object
//     const txObject = {
//       nonce: web3.utils.toHex(nonce),
//       to: receiverAddress,
//       value: web3.utils.toHex(amountInWei),
//       gas: web3.utils.toHex(21000), // Gas limit
//       gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()), // Gas price
//     };

//     // Sign the transaction with the sender's private key
//     const signedTx = await web3.eth.accounts.signTransaction(txObject, senderPrivateKey);

//     // Send the signed transaction
//     const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

//     // Transaction was successful
//     console.log('Transaction Hash:', txReceipt.transactionHash);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

