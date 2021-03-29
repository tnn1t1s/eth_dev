import {ethers} from 'ethers';

// A Web3Provider wraps a standard Web3 provider, which is
// what Metamask injects as window.ethereum into each page
// The Metamask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...


// refactor to use server side / client branching
const ropsten_endpoint = 'https://ropsten.infura.io/v3/c68405b604f443f6b64cdd363a0282cf'
const mnemonic = 'alert baby immune ride daughter clerk loyal group ready oppose tooth increase'

let provider, signer, contract;

//const address = '0x4DFa366566ce1f1493241B8A726b7b52ca538fdd';
const address = '0xfb8Fba4599aE0016Ac06f5962b6B6c882A335D99';
const factory_abi = [
    // Read-Only Functions
    "function getDeployedCampaigns() view returns (address[])",
    //Transaction Functions
    "function createCampaign(uint) public"
];

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
export {provider, signer, contract};
