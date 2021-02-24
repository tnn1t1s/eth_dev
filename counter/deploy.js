// script to deploy Counter to a test network through Infura
// For this test, I'm using Ropsten network

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile.js');

const ropsten_endpoint = 'https://ropsten.infura.io/v3/c68405b604f443f6b64cdd363a0282cf'
const mnemonic = 'alert baby immune ride daughter clerk loyal group ready oppose tooth increase'

const provider = new HDWalletProvider(
     mnemonic,
     ropsten_endpoint
);

const web3 = new Web3(provider);

console.log(web3.eth);


// async/await can only exist in a function
const deploy = async () => {
     const accounts = await web3.eth.getAccounts();
     console.log('Attempting to deploy from account',accounts[0]);
     const result = await new web3.eth.Contract(interface).deploy({data: '0x' + bytecode, arguments: [1]}).send({from: accounts[0]});
     console.log(result.options.address);
};

console.log('about to deploy ...');
deploy().then( () => {
     console.log('deployed');
});
