const Web3 = require('web3');
const ganache = require('ganache-cli');
const assert = require('assert');
const {interface, bytecode} = require('../compileLottery');

const provider = ganache.provider();

let lottery;
let accounts;
beforeEach(async () => {
    //get accounts list
    accounts = await web3.eth.getAccounts();
    //use one of those accounts

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ["hi there"]})
        .send({from: accounts[0], gas: 1000000});
    lottery.setProvider(provider);
});

describe('lottery', () => {
    it('should ', async () => {
        //*test deployed contract success
        assert.ok(lottery.options.address);
        console.log(lottery);
    })

});