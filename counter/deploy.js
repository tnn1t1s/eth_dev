// script to deploy Counter to a test network through Infura
// For this test, I'm using Ropsten network

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile.js');

const provider = new HDWallerProvider(
     'alert baby immune ride daughter clerk loyal group ready oppose tooth increase',
     'https://mainnet.infura.io/v3/c68405b604f443f6b64cdd363a0282cf'
);

const web3 = new Web3(provider);


// async/await can only exist in a function
const deploy = async () => {
     const accounts = await web3.eth.getAccounts();
     console.log('Attempting to deploy from account',
                 accounts[0]);
     const result = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({data: '0x' + bytecode, arguments: [1]}) 
     .send({from: accounts[0]});

deploy() 


