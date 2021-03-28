import {ethers} from 'ethers';

// A Web3Provider wraps a standard Web3 provider, which is
// what Metamask injects as window.ethereum into each page
// The Metamask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...


// refactor to use server side / client branching
const ropsten_endpoint = 'https://ropsten.infura.io/v3/c68405b604f443f6b64cdd363a0282cf'
const mnemonic = 'alert baby immune ride daughter clerk loyal group ready oppose tooth increase'

let provider, signer;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
   // browser w/ metamask execution
   provider = new ethers.providers.Web3Provider(window.ethereum);
   signer = provider.getSigner()
} else {
   provider = ethers.getDefaultProvider(ropsten_endpoint);
   signer = provider.getSigner()
}

export {provider, signer};
