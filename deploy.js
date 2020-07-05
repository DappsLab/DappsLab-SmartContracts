const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode}= require('./compile');

const provider=new HDWalletProvider('detect surround mercy wing invite session subway final fragile fade buyer century','https://rinkeby.infura.io/v3/a3f4dff0483a48ebaec64b896445c146');

const web3=new Web3(provider);

const deploy = async ()=>{
    const accounts =  await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:'0x'+bytecode,arguments:['hi there']})
        .send({from:accounts[0]});
    console.log('contract deployed from',accounts[0]);
    console.log('contract deployed to',inbox.options.address);
};
deploy();


