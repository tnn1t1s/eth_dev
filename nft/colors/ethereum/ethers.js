import {ethers} from 'ethers';

const ropsten_endpoint = 'https://ropsten.infura.io/v3/c68405b604f443f6b64cdd363a0282cf'
const mnemonic = 'alert baby immune ride daughter clerk loyal group ready oppose tooth increase'

let provider, signer, contract;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
   // browser w/ metamask execution
   provider = new ethers.providers.Web3Provider(window.ethereum);
   signer = provider.getSigner();
   contract = new ethers.Contract(address, factory_abi, signer);
} else {
   provider = ethers.getDefaultProvider(ropsten_endpoint);
   signer = provider.getSigner()
   contract = new ethers.Contract(address, factory_abi, provider);
}

// note: if browser execution in metamask, use the 
// account at account[0], if using an eth net account
// this should be undefined since we won't be
// transacting on server side.
export {provider, signer};
