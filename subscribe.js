
const Web3 =  require('web3');
const web3 = new Web3('wss://rinkeby-light.eth.linkpool.io/ws');//http://64.225.91.151:8545

// var Contract = require('web3-eth-contract');

// set provider for all later instances to use
// Contract.setProvider('ws://localhost:8546');
(async ()=>{
    let options = {
        address: ['0xC21a4AD429e4E2E194816d989d9bBd255c67Fd6C', '0xc21a4ad429e4e2e194816d989d9bbd255c67fd6c'],    //Only get events from specific addresses
        topics: [web3.utils.sha3("Transfer(address,address,uint256)")]                              //What topics to subscribe to
    };

    let subscription = await web3.eth.subscribe('logs', options, (err, event) => {
        if (!err)
            console.log(event)
    });

    subscription.on('data', event => console.log("event:", event))
    subscription.on('changed', changed => console.log("changed:",changed))
    subscription.on('error', err => { throw err })
    subscription.on('connected', nr => console.log("nr:",nr))
})()
// web3.eth.subscribe("logs",{
//     address:"0xC21a4AD429e4E2E194816d989d9bBd255c67Fd6C",
//     topics:[
//         web3.utils.sha3("Transfer(address,address,uint256)")
//     ]
// },(error, result) => {
//     if(error){
//         console.error(error);
//     }else{
//         console.log(result)
//     }
// })
