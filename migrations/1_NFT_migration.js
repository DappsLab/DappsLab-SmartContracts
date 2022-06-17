
const DVT = artifacts.require("./NFT.sol")
console.log(DVT);
module.exports = function (deployer){
    deployer.deploy(DVT)
}
