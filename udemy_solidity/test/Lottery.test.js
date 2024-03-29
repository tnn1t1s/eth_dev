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
    if(contract['errors']) {
         console.log(contract);
         assert(false);
    }
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

     it('can enter a player', async () => {
          await lottery.methods.enter().send({
               from: accounts[0],
               value: web3.utils.toWei('0.1', 'ether'),
               gas: '1000000'
          });
          const players = await lottery.methods.getPlayers()
		     .call({from: accounts[0]});

          assert.equal(accounts[0], players[0]);
          assert.equal(1, players.length);
     });

     it('can enter multiple players', async () => {
          await lottery.methods.enter().send({
               from: accounts[0],
               value: web3.utils.toWei('0.1', 'ether'),
               gas: '1000000'
          });

          await lottery.methods.enter().send({
               from: accounts[1],
               value: web3.utils.toWei('0.1', 'ether'),
               gas: '1000000'
          });

          await lottery.methods.enter().send({
               from: accounts[2],
               value: web3.utils.toWei('0.1', 'ether'),
               gas: '1000000'
          });

          const players = await lottery.methods.getPlayers()
		     .call({from: accounts[0]});

          assert.equal(accounts[0], players[0]);
          assert.equal(accounts[1], players[1]);
          assert.equal(accounts[2], players[2]);
          assert.equal(3, players.length);
     });

     it('requires min ether to enter', async () => {
          try {
              await lottery.methods.enter().send({
                      from: accounts[0],
                      value: 0
              });
              assert(false);
          } catch (err) {
              assert(err);
          }
     });

     it('only manager can call pick winner', async () => {
          try {
               await lottery.methods.payWinner.send({
                    from: accounts[1]
               });
               assert(false);
          } catch (err) {
              assert(err);
          }
     });

     it('executes end to end contract and resets', async () => {
         await lottery.methods.enter().send({
              from: accounts[0],
              value: web3.utils.toWei('2', 'ether')
         });

         const initialBalance = await web3.eth.getBalance(accounts[0]);
         await lottery.methods.payWinner().send({ from: accounts[0] });
         const finalBalance = await web3.eth.getBalance(accounts[0]);

         const difference = (finalBalance - initialBalance);
         assert(difference > web3.utils.toWei('1.8'), 'ether');
     });
});



