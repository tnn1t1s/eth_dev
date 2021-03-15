const assert = require('assert');
const ganache = require('ganache-cli');
const ethers = require('ethers');

// contracts
const buildDir = '/home/david/eth_dev/kickstart/ethereum/build/';
const campaignFactory = require(buildDir + 'CampaignFactory.json');
const campaign = require(buildDir + '/Campaign.json');

// tests
const providerUrl = "http://127.0.0.1:8545";
let provider;
let signer;
let accounts;
let factory;
let campaignAddress;

beforeEach(async () => {
    provider = new ethers.providers.JsonRpcProvider(providerUrl);
    accounts = await provider.listAccounts();
    signer = provider.getSigner(0);
});

describe('Campaign Contract', () => {
     it('finds a provider with at least one account and a signer', () => {
          assert.ok(accounts[0]);
          assert.ok(signer);
     });

     it('create the campaignfactory contract', () => {
          factory = new ethers.ContractFactory(campaignFactory.abi,
                                               campaignFactory.evm.bytecode.object,
                                               signer);
     });
});


    /*
    factory = await new web3.eth.Contract(JSON.parse(campaignFactoryContract.abi))
        .deploy({ data: compiledFactory.bytecode})
        .send({ from: accounts[0], gas: '1000000'});
    */
