require('dotenv').config();
const { testnets } = require('./config.json');
const { vrfCoordinator,
        linkToken,
        keyHash } = testnets[process.env.TESTNET]['link'];

const Fractal = artifacts.require("Fractal");

/*
const vrfCoordinator = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9';
const linkToken = '0xa36085f69e2889c224210f603d836748e7dc0088';
const keyHash = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4';
*/

module.exports = function(deployer) {
  deployer.deploy(Fractal, vrfCoordinator, linkToken, keyHash);
};

