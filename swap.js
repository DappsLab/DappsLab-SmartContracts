const  Tx = require('ethereumjs-tx');
const fs = require('fs');
let DVC = fs.readFileSync("./abi.json").toString().trim();
DVC = JSON.parse(DVC);

console.log("DVC:", DVC)
const Web3 = require('web3')
const web3 = new Web3('https://polygon-mainnet.infura.io/v3/c4b3c91d1f5d4fccadd772b74f5010c4');
const panRouterContractAddress = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";

const sender_address = '0xB87318e12a18cddEa0445E272322173b1ECba397';
const dai = "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063";
const matic = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
// ['0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063']

(async () => {
    const deadline = Date.now() + 60000;
    console.log(deadline);
    let balance = await web3.eth.getBalance(sender_address);
    console.log("balance:", balance);
    let contract = new web3.eth.Contract(DVC, panRouterContractAddress);
    console.log(contract);
    let nonce = await web3.eth.getTransactionCount(sender_address);
    console.log("nonce", nonce)

    // {
    let data = contract.methods.swapExactETHForTokens( 0, [matic,dai], sender_address, deadline).encodeABI();
    console.log(data)
    const rawTx = {
        from:sender_address,
        nonce: nonce,
        gasPrice: web3.utils.toHex(web3.utils.toWei('600', 'gwei')),
        gasLimit: 100000,
        to: panRouterContractAddress,
        value: web3.utils.toWei('0.5','ether'),
        data: data,
    };
    // let privateKey = new Buffer('5486e92a4ffdc63c4ca4a22fe128b87351fcec619b3910d88e18b55391f94c48', 'hex')
    // let tx = new Tx(rawTx);
    console.log(rawTx)
    try{

        let signed = await web3.eth.accounts.signTransaction(rawTx, '0x5486e92a4ffdc63c4ca4a22fe128b87351fcec619b3910d88e18b55391f94c48');
        console.log("Signed:",signed)
        let receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
        console.log("receipt:",receipt)

    }catch (e){
        console.log(e);
    }
    //     tx.sign(ethereumjs.Buffer.Buffer.from(privateKey, 'hex'));
    //
    //     var raw = '0x' + tx.serialize().toString('hex');
    //     web3.eth.sendRawTransaction(raw, function (err, transactionHash) {
    //         console.log(transactionHash);
    //     });
    // });
    //
    //
    // let signed_txn = web3.eth.account.sign_transaction(pancakeswap2_txn, private_key= "5486e92a4ffdc63c4ca4a22fe128b87351fcec619b3910d88e18b55391f94c48")
    // let tx_token = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
    // console.log(tx_token, web3.toHex(tx_token))

})();
