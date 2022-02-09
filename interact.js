const fs = require('fs');
let DVC = fs.readFileSync("./build/contracts/NFT.json").toString().trim();
DVC = JSON.parse(DVC);
// console.log(DVC);

const infuraKey = "a3f4dff0483a48ebaec64b896445c146";

const Web3 = require('web3');
const web3 = new Web3('https://rinkeby.infura.io/v3/a3f4dff0483a48ebaec64b896445c146');

const privateKey = '6343d2e0502e5133cb74c528189598264456fdd079c72cbaa78d3605defc3801'
const contractAdddress = '0x5C9776097B7d44BDc18F310f4361C53Af830Ded1'
const pubKey = '0xC21a4AD429e4E2E194816d989d9bBd255c67Fd6C'

let contract = new web3.eth.Contract(DVC, contractAdddress);
// console.log(contract);
(async ()=>{
    contract.methods.symbol().call({from: pubKey}, function (error, result) {
        result && console.log('result:', result)
        error && console.error(error)
    });
    // let nonce = await web3.eth.getTransactionCount(pubKey);
    for(let i = 0; i < 3; i++){
        // nonce=nonce+1;
        // console.log("nonce=", nonce)
        let txContract = contract.methods.mint(pubKey);
        let encoded_tx = txContract.encodeABI();
        let transactionObject = {
            gas: 500000,
            data: encoded_tx,
            from: pubKey,
            to: contractAdddress,
            // nonce:nonce+1
        };
        let signedTx = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
        console.log("signedTx", signedTx)
        let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
            .on('receipt', function (receipt) {
                //do something
                console.log(receipt)
            });
    }
})()
