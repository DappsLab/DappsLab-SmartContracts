const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
let list = ['0xf3939Aa0cd1fEe3154a6D7d7915a0712AAaDD371','0x7F5B51F73e3622c4d6C4F058A59CA08EB63Fc8B6']
const merkleTree = new MerkleTree(list, keccak256, { hashLeaves: true, sortPairs: true });

const root = merkleTree.getHexRoot();
console.log(root);
const proof1 = merkleTree.getHexProof(keccak256(list[0]));
const proof2 = merkleTree.getHexProof(keccak256(list[1]));
console.log(proof1)
console.log(proof2)