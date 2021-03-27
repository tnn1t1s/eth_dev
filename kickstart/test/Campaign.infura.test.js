const assert = require('assert');
const ethers = require('ethers');

// contracts
const buildDir = '/home/david/eth_dev/kickstart/ethereum/build/';
const campaignFactoryContract = require(buildDir + 'CampaignFactory.json');
const campaignContract = require(buildDir + '/Campaign.json');

// tests
const ropsten_endpoint = 'https://ropsten.infura.io/v3/c68405b604f443f6b64cdd363a0282cf'
const mnemonic = 'alert baby immune ride daughter clerk loyal group ready oppose tooth increase'
const providerUrl = ropsten_endpoint;

let provider;
let signer;
let accounts;
let factory;
let campaignFactory;
let campaign;


beforeEach(async () => {
    provider = new ethers.providers.getDefaultProvider(providerUrl);
    signer = provider.getSigner(0);
});

describe('Campaign Contract', function () {
     this.timeout(10000);
     it('gets a provider and a signer', async () => {
         assert.ok(provider);
         assert.ok(signer);
     });

     it('creates campaign factory and gets campaigns', async () => {
         campaignFactoryAddress='0x4DFa366566ce1f1493241B8A726b7b52ca538fdd'
         campaignFactory = new 
                     ethers.Contract(campaignFactoryAddress,
                                     campaignFactoryContract.abi,
                                     provider);
         campaign = await campaignFactory.getDeployedCampaigns();
         assert.ok(campaign);
     });
});
