const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
let list = ['0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2','0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678','0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db','0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB']
const merkleTree = new MerkleTree(list, keccak256, { hashLeaves: true, sortPairs: true });

const root = merkleTree.getHexRoot();
console.log(root);
const proof1 = merkleTree.getHexProof(keccak256(list[0]));
const proof2 = merkleTree.getHexProof(keccak256(list[1]));
const proof3 = merkleTree.getHexProof(keccak256(list[2]));
const proof4 = merkleTree.getHexProof(keccak256(list[3]));
console.log(proof1)
console.log(proof2)
console.log(proof3)
console.log(proof4)