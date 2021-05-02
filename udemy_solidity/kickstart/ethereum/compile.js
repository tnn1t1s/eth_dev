const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
const utils = require('/home/david/eth_dev/utils.js');


const contractName = 'Campaign.sol';
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', contractName);
const source = fs.readFileSync(contractPath, 'utf8');
const contracts = utils.compile(contractPath);

for (contract in contracts) {
     contractOutputFile = path.resolve(buildPath, contract + '.json');
     fs.outputJsonSync(contractOutputFile, contracts[contract]);
}
