const path = require('path');
const fs = require('fs');
const sol = require('solc');

const inboxPath=path.resolve ( __dirname ,'contracts','Inbox.sol');
const source = fs.readFileSync (inboxPath,'utf8');
module.exports = sol.compile (source,1).contracts[':Inbox'];