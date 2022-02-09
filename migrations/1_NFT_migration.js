
const DVT = artifacts.require("./Betting.sol")
console.log(DVT);
module.exports = function (deployer){
    deployer.deploy(DVT)
}
