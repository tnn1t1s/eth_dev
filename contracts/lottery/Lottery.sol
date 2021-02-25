// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Lottery {
     address public manager;
     address[] public players;
     
     constructor() public {
          manager = msg.sender;
     }

     function enter() public payable {
          // set a minimun amount of ether 
          // required to run this function!!!
          require(msg.value > .001 ether);
          // if paid, do work ...
          players.push(msg.sender); 
     }
}
