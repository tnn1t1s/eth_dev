import {ethers} from 'ethers';

const address='0xb8fD400086Ac0D34940756fBB3708939Ec0b1edC'
const abi = [
    // Read-Only Functions
    "function manager() view returns (address)",
    "function getPlayers() view returns (address[])",
    //Transaction Functions
    "function enter() public payable"

];

// A Web3Provider wraps a standard Web3 provider, which is
// what Metamask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum)
// The Metamask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()
const contract = new ethers.Contract(address,
                                     abi,
                                     signer);
console.log('contract ...');
console.log(contract);

export default {provider, signer, contract, address};
