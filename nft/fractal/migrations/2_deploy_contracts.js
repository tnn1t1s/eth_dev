const Fractal = artifacts.require("Fractal");

module.exports = function(deployer) {
  deployer.deploy(Fractal);
};
