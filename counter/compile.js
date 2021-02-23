const path = require('path');
const fs = require('fs');
const solc = require('solc');

const counterPath = path.resolve(__dirname, 'contracts', 'Counter.sol');
const countersol = fs.readFileSync(counterPath, 'UTF-8');

const input = {
    language: 'Solidity',
    sources: {
        'Counter.sol': { content: countersol }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts['Counter.sol'];
const contract = contracts['Counter'];

exports.interface = contract.abi;
exports.bytecode = contract.evm.bytecode.object;
