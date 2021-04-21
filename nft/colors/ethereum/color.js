import {ethers} from 'ethers';
import {provider, signer} from './ethers.js';

const color_abi = [
    // Read-Only Functions
    "function totalSupply() public view returns (uint)"
    // Transaction Functions
];


export default (address) => {
  let contract;
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
     // browser w/ metamask execution
     contract = new ethers.Contract(address,
                                    color_abi,
                                    signer);
  } else {
     // next.js server side execution
     contract = new ethers.Contract(address,
                                    color_abi,
                                    provider);
  }
  return contract;
};
