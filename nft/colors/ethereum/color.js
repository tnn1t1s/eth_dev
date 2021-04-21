import {ethers} from 'ethers';
import {provider, signer} from './ethers.js';
import Color from './abis/Color.json'

const color_abi = Color.abi;

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
