const { endpoint, mnemonic, projectId, projectSecret } = require('./secrets.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, endpoint),
      network_id: 3, //Ropsten's id
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  contracts_directory: './ethereum/contracts/',
  contracts_build_directory: './ethereum/abis/',
  compilers: {
    solc: {
      version: "0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
