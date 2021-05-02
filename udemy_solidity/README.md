# eth_dev
"Ethereum and Solidity, the Complete Developers Guide" is an online course offerd by Udemy and presented by Steve Brehtin. The course is outdated at this point and the examples require significant reworking to run on a modern Ethereum software stack. The repo presents updated examples using the following:
 * Ports from web3 to the Ethers library
 * Updated to support Solidity > 0.8
 * Next examples using Next v.X with React v.X
 * Added tests and standalone utilities for Infura integration on Ropsten network

The course is available here: https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/learn/lecture/8784912#overview

## additional learning materials
This repo includes a reworked version of the Colors NFT Tutorial available here: https://www.youtube.com/watch?v=YPbgjPPC1d0

I reworked this tutorial to support React > 17, Solidity 0.8 and the very much refactored openzeppelin ERC721 contracts. 


## TODO
This oreilly book seems solid. work through it.

https://www.oreilly.com/library/view/mastering-blockchain-programming/9781839218262/d1f68aa4-1575-45f8-8e88-0e08a154ff60.xhtml

https://anallergytoanalogy.medium.com/jumping-into-solidity-the-erc721-standard-part-2-383438734de5

## NOTES
1. run `truffle migrate --reset` to update contract on ethnet
