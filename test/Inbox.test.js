const assert = require("assert");
const ganache = require("ganache-cli");
const Web3=require("web3");
const {interface, bytecode}=require("../compile");

const provider = ganache.provider();
const web3 = new Web3(provider);


//!old method
// beforeEach(()=>{
//    //get accounts list
//    web3.eth.getAccounts()
//        .then(fetchedAccounts =>{
//            console.log(fetchedAccounts);
//        } )
// });

let accounts;
let inbox;
beforeEach(async ()=>{
   //get accounts list
   accounts =await web3.eth.getAccounts();
   //use one of those accounts

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:bytecode,arguments:["hi there"]})
        .send({from:accounts[0],gas:1000000});
    inbox.setProvider(provider);
});

describe('Inbox',()=>{
    it('should return',()=>{
        //*test deployed contract success
        assert.ok(inbox.options.address);
        console.log(inbox);
    });

    it('should have initial message',async()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message,'hi there');
    });

    it('can change message',async()=>{
        await inbox.methods.setMessage('bye').send({from:accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,'bye');
    })
});









//! testing example
//
// class Car{
//     park(){
//         return 'park';
//     }
//
//     drive(){
//         return 'drive';
//     }
// }
//
// let car;
//* beforeEach(()=>{
//     car = new Car();
// });
//* describe('Car',() => {
//*     it("park",() => {
// *        assert.equal(car.park(),"park");
//
//     })
// });
