## Before Getting Started
Install [Metamask](http://metamask.io), create at least two accounts, and become familiar with switching between mainnet, Ropsten and Rinkeby networks. Fund an account on the Ropsten network using a [Ropsten Faucet](https://faucet.dimensions.network). Note: You will also need to fund account w/ Link but at the time of this writing i don't know of an open Link faucet for any network. 

Download [ganache-2.5.4-linux-x86_64.AppImage](https://www.trufflesuite.com/ganache). Copy the downloaded file into the ./bin/ directory of the `nft/colors` React project.

Run Ganache and verify that you have a working blockchain. It is recommended to always run ganache from this directory rather than installing in a global location as version mismatches can be difficult to debug.
 
## Getting Started
Before starting the application, run the tests to ensure blockchain operations. It is best to use the intstance of truffle deployed to this project, rather than a globally installed instance. This will ensure project compatibility with other packages in package.json and truffle-config.js.

```./node_modules/.bin/truffle test```

Once the tests pass, deploy the contracts to your local blockchain with the following:

```./node_modules/.bin/truffle migrate --reset```

If deployment is successful, you can interact with the contract using the truffle console

```./node_modules/.bin/truffle console```

To demonstrate this capability, mint a ColorPunx NFT Token:

```
truffle(development) contract = await Color.deployed()
truffle(development) await contract.mint('#FFFFFF')
```

## Learn More
To learn more about testing on public nets, try the following guide: [Connecting to Public Test Networks with Truffle](https://forum.openzeppelin.com/t/connecting-to-public-test-networks-with-truffle/2960)

To learn about transferring NFTs to your friends and family, follow this guide [Transferring ERC721 tokens](https://forum.openzeppelin.com/t/transferring-erc721-tokens/4726). 

To learn about adding meta data to NFTs for integration with Metamask and Opensea, and how to list and sell on OpenSea, watch [this excellent tutorial](https://www.youtube.com/watch?v=p36tXHX1JD8).
