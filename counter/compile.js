const path = require('path');
const fs = require('fs');
const solc = require('solc');
 
const HelloPath = path.resolve(__dirname, 'contracts', 'Hello.sol');
const Hellosol = fs.readFileSync(HelloPath, 'UTF-8');
 
var input = {
    language: 'Solidity',
    sources: {
        'Hello.sol': {content : Hellosol}
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
for (var contractName in output.contracts['Hello.sol']) {
    console.log(contractName + ': ' + output.contracts['Hello.sol'][contractName].evm.bytecode.object)
}
