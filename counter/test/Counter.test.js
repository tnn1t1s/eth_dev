const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// ganache is an ethereum network provider that runs locally
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile.js');

let accounts;
let counter;

console.log(interface);

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    account_balance = await web3.eth.getBalance(accounts[0]);
    
    estimated_gas = await new web3.eth.Contract(interface)
        .deploy({ data: bytecode, arguments: [0] })
        .estimateGas({from: accounts[0]});

    counter = await new web3.eth.Contract(interface)
        .deploy({ data: bytecode, arguments: [0] })
        .send({ from: accounts[0],
                gas: estimated_gas,
                gasPrice: '30000000' })
});


describe('Hello', () => {
    it('deploys a contract', () => {
        assert.ok(counter.options.address);
    });

    it('has default value of 0', async () => {
        const value = await counter.methods.get().call();
        assert.equal(value, 0);
        
    });

    it('can increment', async () => {
        await counter.methods.inc().send({ from: accounts[0] });
        const value = await counter.methods.get().call();
        assert.equal(value, 1);
   });
        
});





