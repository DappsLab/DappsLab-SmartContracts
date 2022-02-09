
const DVC = artifacts.require("./NFT.sol")
console.log("DVC:", DVC)
module.exports = function (deployer){
    deployer.deploy(DVC)
}
