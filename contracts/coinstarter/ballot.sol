// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Campaign {
     struct Request {
         string description;
         uint value;
         address recipient;
         bool complete;
     }

     address public manager;
     address[] public approvers;
     Request[] public requests;
     uint public minContribution;

     modifier restricted() {
         require(msg.sender == manager);
         _;
     }
   
     constructor(uint minimum) {
         manager = msg.sender;
         minContribution = minimum;
     }

     function contribute() public payable {
       require(msg.value >= minContribution);
       approvers.push(msg.sender);
     }
}

