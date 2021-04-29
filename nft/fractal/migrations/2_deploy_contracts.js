require('dotenv').config();
const { testnets } = require('../config.json');
const { vrfCoordinator,
        linkToken,
        keyHash } = testnets[process.env.TESTNET]['link'];

console.log(process.env.TESTNET);
const Fractal = artifacts.require("Fractal");

module.exports = function(deployer) {
  deployer.deploy(Fractal, vrfCoordinator, linkToken, keyHash);
};

