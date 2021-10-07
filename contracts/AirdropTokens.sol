pragma solidity ^0.4.0;

import "../openzeppelin/contracts/access/Ownable.sol";
import {MerkleProof} from "../openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract AirdropTokens is Ownable{

    event GainsClaimed(address indexed _address, uint256 _value);
    using MerkleProof for bytes32[];
    uint256 public totalTokens;
    address[] public users;
    mapping(address => uint256) public claimed;
    bytes32 merkleRoot;
    bool public isAirdropped;
    constructor() Ownable(){

    }

    function setMerkleRootAndAirDrop(bytes32 root) onlyOwner public
    {
        merkleRoot = root;
        totalTokens = token.getBalance(address(this));
        isAirdropped = true;
    }

    function getTotalTokens() public view returns(uint256){
        return totalTokens;
    }

    function getUsers() public view returns(address[] memory) {
        return users;
    }

    function checkUser(address user) public view returns(bool){
        return !(users[user] == 0);
    }

    function getProof(bytes32[] memory proof) public view returns(bool){
        if(proof.verify(merkleRoot, keccak256(abi.encodePacked(msg.sender)))){
            return true;
        }else{
            return false;
        }
    }

    function addUsers(address[] memory userAddresses) onlyOwner public {
        if (users.length == 0) {
            users = userAddresses;
        } else {
            for (uint i=0; i < userAddresses.length; i++) {
                users.push(Accounts2[i]);
            }
        }
    }

    function claim(bytes32[] memory proof) public {
        require(merkleRoot != 0, "AirdropTokens not available yet!");

        require(proof.verify(merkleRoot, keccak256(abi.encodePacked(msg.sender))), "You are not in the list");

        uint256 total = users.length/totalTokens;


    }

}
