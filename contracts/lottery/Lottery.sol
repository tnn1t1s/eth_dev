// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Lottery {
     address public manager;
     address payable[] public players;
     address[] public players_f;
    
     constructor() {
          manager = msg.sender;
     }

     function enter() public payable {
         require(msg.value >= 0.1 ether);
         players.push(payable(msg.sender));
     }
     
     function random() private view returns (uint256) {
         return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
     } 
     
     function payWinner() public restricted {
         uint index = random() % players.length;
         address contractAddress = address(this);
         players[index].transfer(contractAddress.balance);
         resetContract();
     }
     
     
     function resetContract() private {
         players = new address payable[](0);
     }
     
     function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
     
     modifier restricted() {
         require(msg.sender == manager);
         _;
     }
}

