const Color = artifacts.require('./Color.sol');

require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('Color', (accounts) => {
  let contract;

  before(async () => {
    contract = await Color.deployed();
  });

  describe('deployment', async() => {

    it('deploys', async () => {
      const address = contract.address;
      assert.notEqual(address, '');
      assert.notEqual(address, null);
    });

    it('has a name', async () => {
      const name = await contract.name();
      assert.equal(name, 'Color');
    });

    it('has a symbol', async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, 'COLOR');
    });
  });

  describe('deployment', async() => {

    it('creates a new token', async () => {
      const result = await contract.mint("#EC058E");
      const totalSupply = await contract.totalSupply();
      assert.equal(totalSupply, 1);
    });

  });
});
