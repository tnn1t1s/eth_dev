const fs = require('fs');
const path = require('path');
const solc = require('solc');


/**
 * Returns a `contract` where
 * the contract "interface" is contract.abi and
 * the compiled "bytecode" is contract.evm.bytecode.object
 * compiler doc: https://docs.soliditylang.org/en/v0.4.24/using-the-compiler.html
 *
 * @param {string} contractUri The path to the contract source
 * @return {contract} a solc compiled contract object
 */
const compile = (contractUri) => {
    const contractParts = path.parse(contractUri);
    const contractFilename = contractParts.base;
    //const contractName = contractParts.name;
    const contractSource = fs.readFileSync(contractUri, 'UTF-8');
    const input = {
        language: 'Solidity',
        sources: {
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': [ '*' ]
                }
            }
        }
    };
    input['sources'][contractFilename] = {content : contractSource };
    output = JSON.parse(solc.compile(JSON.stringify(input)))
    if(output['errors'])
         return output;
    contracts = output.contracts[contractFilename];
    //contract = contracts[contractName];
    return contracts;
};

module.exports = {'compile' : compile};
