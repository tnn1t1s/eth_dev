import {ethers} from 'ethers';
import {provider, signer} from './ethers.js';



const address = '0x4DFa366566ce1f1493241B8A726b7b52ca538fdd';
const factory_abi = [
    // Read-Only Functions
    "function getDeployedCampaigns() view returns (address[])",
    //Transaction Functions
    "function createCampaign(uint) public"

];

let contract = undefined;

if (signer != undefined) {
    contract = new ethers.Contract(address,
                                   factory_abi,
                                   signer);
    console.log('contract ...');
    console.log(contract);
}

export default contract;
