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
    provider = new ethers.getDefaultProvider(providerUrl);
    accounts = await provider.listAccounts();
    signer = provider.getSigner(0);
    console.log(accounts);
});

describe('Campaign Contract', () => {
     it('finds a provider with at least one account and a signer', () => {
         assert.ok(accounts[0]);
         assert.ok(signer);
     });
});
