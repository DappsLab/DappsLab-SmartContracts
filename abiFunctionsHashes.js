const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const foreach = require("foreach");
const path = require('path');
const util = require("util");
const directoryPath = path.join(__dirname, '/build/contracts');
console.log("directoryPath:",directoryPath)
const readdir = util.promisify(fs.readdir);
let dataList = [];
const provider=new HDWalletProvider('detect surround mercy wing invite session subway final fragile fade buyer century','http://64.225.91.151:8545');

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
const readAllFiles = async ()=>{
    let filesList = await readdir(directoryPath);
    // await fs.readdir(directoryPath, function (err, files) {
    //     //handling error
    //     if (err) {
    //         return console.log('Unable to scan directory: ' + err);
    //     }
    //     filesList=files;
    //     //listing all files using forEach
    //
    // });
    console.log("filesList",filesList)

    for(let i = 0; i < filesList.length; i++) {
        if(filesList[i]){
            let DVC = await fs.readFileSync(`./build/contracts/${filesList[i]}`).toString().trim();
            DVC = JSON.parse(DVC);
            await deploy(DVC)
        }else{
            console.log("file not found:",filesList[i], "at index ",i )
        }
        // Do whatever you want to do with the file
        // console.log(file);
    }
    console.log("dataList: " + JSON.stringify(dataList))
    fs.writeFileSync('abiFunctionsHashes.json', JSON.stringify(dataList));
}
const deploy = async (DVC)=>{

    // const accounts =  await web3.eth.getAccounts();
    // console.log('deploying contract from ',accounts[0])
    let contract = await new web3.eth.Contract(DVC.abi);
    // console.log('contract', Object.keys(contract.methods))

    let breakFlag = false;
    let data = {};
    Object.keys(contract.methods).forEach((value, index)=>{
        if(value.includes("0x")&& breakFlag){
            breakFlag = false;
            dataList.push(data)
            console.log("data1", data)
            data = {...data};

        }
        if(breakFlag){
            dataList.push(data)
            data = {};
        }
        if(value.includes("(")){
            // console.log(value);
            breakFlag = true;
        }
        if(value.includes("0x")){
            data = {
                ...data,
                hash:value,
            }
        }else if(value.includes("(")){
            data = {
                ...data,
                method:value,
            }
        }else{
            breakFlag = false;
            data = {
                ...data,
                name:value,
            }
        }



    })
    // console.log(dataList)

    // .deploy({data:DVC.bytecode,arguments:[]});
    // .send({from:"0xdf34f666d96a9d65cd201a8a95950446a5ce8af2"});
    // let handle = await send(contract.deploy({data: DVC.bytecode,arguments:[]}));
    //
    // console.log(handle)
    // console.log(`contract deployed at address ${handle.contractAddress}`);
    // let deployedContract = new web3.eth.Contract(DVC.abi, handle.contractAddress);
    // // console.log('contract deployed from',accounts[0]);
    // console.log('contract deployed to',deployedContract.options.address);
    // return true;
};
//0xe501629aa26bde129edfa3bd2d67b6bfaf0358fd82201f123453d6ce223d321f
console.log('contract deployed ', readAllFiles());


