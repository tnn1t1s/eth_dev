pragma solidity >=0.4.16 <0.9.0;

contract Lottery {
     address public manager;
     address[] public players;
    
     constructor() {
          manager = msg.sender;
     }

     function enter() public payable {
         require(msg.value > 0.1 ether);
         players.push(msg.sender); 
     }
     
     function random() private view returns (uint256) {
         return uint256(keccak256(abi.encodePacked(block.difficulty,
                                                   block.timestamp,
                                                   players)));
     } 
}

