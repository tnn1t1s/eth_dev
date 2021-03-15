const assert = require('assert');
const ganache = require('ganache-cli');
const ethers = require('ethers');

// contracts
const buildDir = '/home/david/eth_dev/kickstart/ethereum/build/';
const campaignFactoryContract = require(buildDir + 'CampaignFactory.json');
const campaignContract = require(buildDir + '/Campaign.json');

// tests
const providerUrl = "http://127.0.0.1:8545";
let provider;
let signer;
let accounts;
let factory;
let campaignFactory;
let campaign;

beforeEach(async () => {
    provider = new ethers.providers.JsonRpcProvider(providerUrl);
    accounts = await provider.listAccounts();
    signer = provider.getSigner(0);
    approver_0 = provider.getSigner(0);
    factory = new ethers.ContractFactory(campaignFactoryContract.abi, campaignFactoryContract.evm.bytecode.object, signer);
    campaignFactory = await factory.deploy();

    await campaignFactory.createCampaign('100');
    [campaignAddress] = await campaignFactory.getDeployedCampaigns();
    campaign = new ethers.Contract(campaignAddress,
                                   campaignContract.abi,
                                   approver_0);
});

describe('Campaign Contract', () => {
     it('finds a provider with at least one account and a signer', () => {
         assert.ok(accounts[0]);
         assert.ok(signer);
     });

     it('deploys factory and can create a campaign', () => {
         assert.ok(campaignFactory.address);
         assert.ok(campaign.address);
     });

     it('marks caller as campaign manager', async () => {
         const manager = await campaign.manager();
         assert.equal(accounts[0], manager);
     });

     it('supports contribute and adds to approvers', async () => {
         await campaign.contribute({value : '200'});
         const isApprover = await campaign.approvers(accounts[0]);
         assert.ok(isApprover);
     });

     it('has minimum contribution requirement', async () => {
         try {
             await campaign.contribute({value : '99'});
             assert(false);
         } catch (err) {
             assert(err);
         }
     });

     it('marks caller as campaign manager', async () => {
         const manager = await campaign.manager();
         assert.equal(accounts[0], manager);
     });

     it('allows manager to make payment request', async () => {
        await campaign.createRequest('x','1000', accounts[2]);
     });
});
