// For this test, I'm using Ropsten network

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const ropsten_endpoint = 'https://ropsten.infura.io/v3/c68405b604f443f6b64cdd363a0282cf'
const mnemonic = 'alert baby immune ride daughter clerk loyal group ready oppose tooth increase'

const provider = new HDWalletProvider(
     mnemonic,
     ropsten_endpoint
);
const web3 = new Web3(provider);

// load from files
const interface;
const bytecode;

const deploy = async () => {
     const accounts = await web3.eth.getAccounts();
     console.log('Attempting to deploy from account',accounts[0]);
     const result = await new web3.eth.Contract(interface).deploy({data: '0x' + bytecode}).send({from: accounts[0]});
     console.log(result.options.address);
};

console.log('about to deploy ...');
deploy().then( () => {
     console.log('deployed');
     process.exit();
});
