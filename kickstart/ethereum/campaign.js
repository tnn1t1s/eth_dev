import {ethers} from 'ethers';
import {provider, signer} from './ethers.js';

const campaign_abi = [
    // Read-Only Functions
    "function getSummary() public view returns (uint, uint, uint, uint, address)",
    "function getRequestsCount() public view returns (uint)",
    "function approversCount() public view returns (uint)",
    "function getRequest(uint) public view returns (string, uint, uint)",
    //Transaction Functions
    "function contribute() public payable",
    "function approveRequest(uint) public",
    "function createRequest(string description, uint value, address recipient) public"
];


export default (address) => {
  let contract;
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
     // browser w/ metamask execution
     contract = new ethers.Contract(address,
                                    campaign_abi,
                                    signer);
  } else {
     // next.js server side execution
     contract = new ethers.Contract(address,
                                    campaign_abi,
                                    provider);
  }
  return contract;
};


