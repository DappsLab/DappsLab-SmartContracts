const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
// let list = ['0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2','0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c','0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db','0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB','0x617F2E2fD72FD9D5503197092aC168c91465E7f2']
// let list = ['0x17F6AD8Ef982297579C203069C1DbfFE4348c372','0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C','0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678','0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7','0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C']
// let list = ['0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC','0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB','0x583031D1113aD414F02576BD6afaBfb302140225','0xdD870fA1b7C4700F2BD7f44238821C26f7392148','0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2']
let list = ['0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2','0xa9949850AfF595C70eB752Ff8FfB66A85d0ED985']
const merkleTree = new MerkleTree(list, keccak256, { hashLeaves: true, sortPairs: true });

const root = merkleTree.getHexRoot();
console.log(root);
const proof1 = merkleTree.getHexProof(keccak256(list[0]));
const proof2 = merkleTree.getHexProof(keccak256(list[1]));
// const proof3 = merkleTree.getHexProof(keccak256(list[2]));
// const proof4 = merkleTree.getHexProof(keccak256(list[3]));
// const proof5 = merkleTree.getHexProof(keccak256(list[4]));
console.log(proof1)
console.log(proof2)
// console.log(proof3)
// console.log(proof4)
// console.log(proof5)
