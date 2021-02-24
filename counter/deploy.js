// script to deploy Counter to Rinkeby network through Infura

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile.js');

const provider = new HDWallerProvider(
     'alert baby immune ride daughter clerk loyal group ready oppose tooth increase',
     'https://mainnet.infura.io/v3/c68405b604f443f6b64cdd363a0282cf'
);

const web3 = new Web3(provider);


