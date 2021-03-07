// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Campaign {
     struct Request {
         string description;
         uint value;
         address recipient;
         bool complete;
         uint approvalCount;
         mapping(address => bool) approvals;
     }

     address public manager;
     Request[] public requests;
     uint public minContribution;
     mapping(address => bool) public approvers;

     modifier restricted() {
         require(msg.sender == manager);
         _;
     }
   
     constructor(uint minimum) {
         manager = msg.sender;
         minContribution = minimum;
     }

     function createRequest(string description,
                            uint value,
                            address recipient) public restricted {
          Request request = Request({
                  description: description,
                  value: value,
                  recipient: recipient,
                  complete: false});

          requests.push(request);
     }

     function contribute() public payable {
        require(msg.value >= minContribution);
        approvers[msg.sender] = true;
     }
}

