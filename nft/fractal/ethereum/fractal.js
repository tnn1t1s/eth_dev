import {ethers} from 'ethers';
import {provider, signer} from './ethers.js';
import Fractal from './abis/Fractal.json'

const fractal_abi = Fractal.abi;

export default (address) => {
  let contract;
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
     // browser w/ metamask execution
     contract = new ethers.Contract(address,
                                    fractal_abi,
                                    signer);
  } else {
     // next.js server side execution
     contract = new ethers.Contract(address,
                                    fractal_abi,
                                    provider);
  }
  return contract;
};
