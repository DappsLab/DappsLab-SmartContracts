const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
let DVC = fs.readFileSync("./build/contracts/DVC.json").toString().trim();
DVC = JSON.parse(DVC);

const provider = new HDWalletProvider('detect surround mercy wing invite session subway final fragile fade buyer century','http://64.225.91.151:8545');

const web3 = new Web3(provider);

// web3.eth.getProtocolVersion()
//     .then(console.log);

async function send(transaction) {
    let gas = await transaction.estimateGas({from: '0xE8CAB3e41637A15EF0580c438b1547e9ae2469b7'});
    let options = {
        to  : transaction._parent._address,
        data: transaction.encodeABI(),
        gas : gas
    };
    let signedTransaction = await web3.eth.accounts.signTransaction(options, '0x17c960c14328d0653070ced33d780801901e9a2d9d2413f2e50d1d3cfc40fc3d');
    return await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
}

const deploy = async ()=>{
    // const accounts =  await web3.eth.getAccounts();
    // console.log('deploying contract from ',accounts[0])
    let contract = await new web3.eth.Contract(DVC.abi);
        // .deploy({data:DVC.bytecode,arguments:[]});
        // .send({from:"0xdf34f666d96a9d65cd201a8a95950446a5ce8af2"});
    let handle = await send(contract.deploy({data: DVC.bytecode,arguments:[]}));

    console.log(handle)
    console.log(`contract deployed at address ${handle.contractAddress}`);
    let deployedContract = new web3.eth.Contract(DVC.abi, handle.contractAddress);
    // console.log('contract deployed from',accounts[0]);
    console.log('contract deployed to',deployedContract.options.address);
    return true;
};
//0xe501629aa26bde129edfa3bd2d67b6bfaf0358fd82201f123453d6ce223d321f
console.log('contract deployed ', deploy());


