const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const utils = require('../utils.js');

let interface, bytecode;
let lottery;
let accounts;

beforeEach(async() => {
    contract = utils.compile('./contracts/lottery/Lottery.sol');
    interface = contract.abi;
    bytecode = contract.evm.bytecode.object;
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(contract.abi)
      .deploy({ data: bytecode })
      .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery Contract', () => {
     it('deploys', () => {
          assert.ok(lottery.options.address);
     });
});



