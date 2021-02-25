// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Lottery {
     address public manager;
     
     constructor() public {
          manager = msg.sender;
     }
}
