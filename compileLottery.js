const fs=require("fs");
const path=require("path");
const sol=require("solc");

const lotteryPath = path.resolve(__dirname, 'contracts','Lottery.sol');
const source=fs.readFileSync(lotteryPath,'utf8');
module.exports = sol.compile(source,1).contracts[':Lottery'];