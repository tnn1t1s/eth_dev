import {ethers} from 'ethers';

const ropsten_endpoint = 'https://ropsten.infura.io/v3/c68405b604f443f6b64cdd363a0282cf'
const ganache_endpoint = 'http://localhost:7545'
const mnemonic = 'alert baby immune ride daughter clerk loyal group ready oppose tooth increase'
const endpoint = ganache_endpoint;

let provider, signer, contract;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
   // browser w/ metamask execution
   provider = new ethers.providers.Web3Provider(window.ethereum);
   signer = provider.getSigner();
} else {
   provider = ethers.getDefaultProvider(endpoint);
   signer = provider.getSigner()
}

// note: if browser execution in metamask, use the 
// account at account[0], if using an eth net account
// this should be undefined since we won't be
// transacting on server side.
export {provider, signer};
