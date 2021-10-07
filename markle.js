const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
let list = ['0xCf4D33D710C2f487A8EbbDC57dD39a37F34A619a','0x0B4163cDadd2b5505EB87fBd06eEC0aa58CeB2D2','0x31738e41771F1502858EBaC782D13D1bA2D253B4','0x627f5f6962f050b71ee40168b60Cd36E70478Ea5']
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