const path = require('path');
const fs = require('fs');
const sol = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');
console.log(source)
let compiled="hi";
(async()=>{
    compiled = await sol.compile(source, 1).contracts[':Inbox'];
    console.log("compiled:", compiled)
})()
module.exports = compiled
