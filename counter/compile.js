const path = require('path');
const fs = require('fs');
const solc = require('solc');
 
const CounterPath = path.resolve(__dirname, 'contracts', 'Counter.sol');
const Countersol = fs.readFileSync(CounterPath, 'UTF-8');
 
var input = {
    language: 'Solidity',
    sources: {
        'Counter.sol': {content : Countersol}
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};
 
var output = JSON.parse(solc.compile(JSON.stringify(input)))

contracts = output.contracts['Counter.sol'];
contract = contracts['Counter'];

 
module.exports = {"interface" : contract.abi,
                  "bytecode" : contract.evm.bytecode.object};
