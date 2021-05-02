// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;


contract CampaignFactory {
     address[] public deployedCampaigns;

     function createCampaign(uint minimum) public {
         Campaign campaign = new Campaign(minimum,
                                         msg.sender);
         deployedCampaigns.push(address(campaign));
     }

     function getDeployedCampaigns() public view returns (address[] memory) {
          return deployedCampaigns;
     }
}

contract Campaign {
     struct Request {
         string description;
         uint value;
         address payable recipient;
         bool complete;
         uint approvalCount;
         mapping(address => bool) approvals;
     }

     address public manager;
     Request[] public requests;
     uint public minimumContribution;
     mapping(address => bool) public approvers;
     uint public approversCount;

     modifier restricted() {
         require(msg.sender == manager);
         _;
     }

     constructor(uint minimum, address creator) {
         manager = creator;
         minimumContribution = minimum;
     }

     function createRequest(string memory description,
                            uint value,
                            address payable recipient) public restricted {
          Request storage newRequest = requests.push();
          newRequest.description = description;
          newRequest.value = value;
          newRequest.recipient = recipient;
          newRequest.complete = false;
          newRequest.approvalCount = 0;
     }

     function approveRequest(uint index) public {
         Request storage request = requests[index];
         require(approvers[msg.sender]);
         require(!request.approvals[msg.sender]);

         request.approvals[msg.sender] = true;
         requests[index].approvalCount++;
     }

     function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
     }

     function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
     }

     function getSummary() public view returns (
       uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
     }

     function getRequestsCount() public view returns (uint) {
         return requests.length;
     }

     function getRequest(uint index) public view returns (string memory, uint, uint) {
         Request storage request = requests[index];
         return (
            request.description,
            request.value,
            request.approvalCount
         );
     }
}

