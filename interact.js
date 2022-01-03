const fs = require('fs');
let DVC = fs.readFileSync("./build/contracts/NFT.json").toString().trim();
DVC = JSON.parse(DVC);
console.log(DVC.abi);

const infuraKey = "a3f4dff0483a48ebaec64b896445c146";

const Web3 =  require('web3');
const web3 = new Web3('https://rinkeby.infura.io/v3/a3f4dff0483a48ebaec64b896445c146');//http://64.225.91.151:8545

// var Contract = require('web3-eth-contract');

// set provider for all later instances to use
// Contract.setProvider('ws://localhost:8546');

let  contract = new web3.eth.Contract(DVC.abi, '0x37e03e6B0924a924F62710263265386215FB2f55');
console.log(contract);
contract.methods.getSellPrice('aff5fc1b-a03e-44a7-8cc4-6fe99dc0a53e').call({from: '0x078425B1b19bA3361AD9ec9247f97510a8bFB583'}, function(error, result){
    result && console.log('result:', result)
    error && console.error(error)
});
// contract.methods.getNFTRegistery().send({from: '0xaC230d42262177B88611157206ecf778bDF67EEA'})
//     .on('transactionHash', function(hash){
//         console.log('transactionHash:', hash)
//     })
//     .on('receipt', function(receipt){
//         console.log('receipt:', receipt)
//     })
//     .on('confirmation', function(confirmationNumber, receipt){
//         console.log('confirmationNumber:', confirmationNumber)
//     })
//     .on('error', function(error, receipt) {
//         console.log('error:', error , 'receipt:', receipt)
//     });
