pragma solidity ^0.4.0;

contract Lottery {
    address public manager;
    address[] public players;
    function Lottery(){
        manager=msg.sender;
    }
    function enterLottery()public payable{
        require(msg.value > 0.0001 ether);
        players.push(msg.sender);
    }
    function random() private view returns (uint){
        return uint(keccak256(block.difficulty,now,players));
    }
    function pickWinner()public restricted{
        players[random()%players.length].transfer(this.balance);
        players=new address[](0);
    }
    modifier restricted(){
        require(msg.sender==manager);
        _;
    }
    function getPlayers() public view returns(address[]){
        return players;
    }
}
