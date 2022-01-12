// Helper script that buys ONLYONE token from a specified address specified on text file SPECIFY_ACCOUNTS_YOU_WANT_TO_BUY_FOR_HERE.json
// The amount is specified with 'originalAmountToBuyWith' variable in the source
// The JSON file should have an array with objects with 'address' field and 'privateKey' field.
// Buys ONLYONE for ${bnbAmount} BNB from pancakeswap for address ${targetAccounts[targetIndex].address}
// targetIndex is passed as an argument: process.argv.splice(2)[0]

var fs = require('fs')
var Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3')
var Common = require('ethereumjs-common').default;


const web3 = new Web3('https://polygon-mainnet.infura.io/v3/c4b3c91d1f5d4fccadd772b74f5010c4');

// SPECIFY_THE_AMOUNT_OF_BNB_YOU_WANT_TO_BUY_FOR_HERE
var originalAmountToBuyWith = '0.007' + Math.random().toString().slice(2,7);
var bnbAmount = web3.utils.toWei(originalAmountToBuyWith, 'ether');

var targetAccounts = '0x5486e92a4ffdc63c4ca4a22fe128b87351fcec619b3910d88e18b55391f94c48';

var targetIndex = Number(process.argv.splice(2)[0]);
var targetAccount = targetAccounts[targetIndex];

console.log(`Buying ONLYONE for ${originalAmountToBuyWith} BNB from pancakeswap for address ${'0xB87318e12a18cddEa0445E272322173b1ECba397'}`);

var res = buyOnlyone(targetAccounts[targetIndex], bnbAmount);
console.log(res);

async function buyOnlyone(amount) {

    var amountToBuyWith = web3.utils.toHex(amount);
    var privateKey = Buffer.from('5486e92a4ffdc63c4ca4a22fe128b87351fcec619b3910d88e18b55391f94c48', 'hex')  ;
    let DVC = fs.readFileSync("./abi.json").toString().trim();
    DVC = JSON.parse(DVC);
    var abiArray = DVC;
    var matic = '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'; // ONLYONE contract address
    var dai = '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063'; // WBNB token address

    // var onlyOneWbnbCakePairAddress = '0xd22fa770dad9520924217b51bf7433c4a26067c2';
    // var pairAbi = JSON.parse(fs.readFileSync('cake-pair-onlyone-bnb-abi.json', 'utf-8'));
    // var pairContract = new web3.eth.Contract(pairAbi, onlyOneWbnbCakePairAddress/*, {from: targetAccount.address}*/);
    var amountOutMin = '100' + Math.random().toString().slice(2,6);
    var pancakeSwapRouterAddress = '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506';

    // var routerAbi = JSON.parse(fs.readFileSync('pancake-router-abi.json', 'utf-8'));
    var contract = new web3.eth.Contract(abiArray, pancakeSwapRouterAddress, {from: '0xB87318e12a18cddEa0445E272322173b1ECba397'});
    var data = contract.methods.swapExactETHForTokens(
        web3.utils.toHex(amountOutMin),
        [matic,
            dai],
        '0xB87318e12a18cddEa0445E272322173b1ECba397',
        web3.utils.toHex(Math.round(Date.now()/1000)+60*20),
    );

    var count = await web3.eth.getTransactionCount('0xB87318e12a18cddEa0445E272322173b1ECba397');
    var rawTransaction = {
        "from":'0xB87318e12a18cddEa0445E272322173b1ECba397',
        "gasPrice":web3.utils.toHex(5000000000),
        "gasLimit":web3.utils.toHex(290000),
        "to":pancakeSwapRouterAddress,
        "value":web3.utils.toHex(amountToBuyWith),
        "data":data.encodeABI(),
        "nonce":web3.utils.toHex(count)
    };

    var transaction = new Tx(rawTransaction);
    transaction.sign(privateKey);

    var result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
    console.log(result)
    return result;
}
