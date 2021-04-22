This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses [Ethers](https://docs.ethers.io/v5/) to interact with Ethereum networks and has support for [Ganache](https://www.trufflesuite.com/ganache) local blockchains as well as access to Ropsten and Rinkeby test networks using [Infura](infura.io)

## Before Getting Started
Install [Metamask](http://metamask.io), create at least two accounts, and become familiar with switching between mainnet, Ropsten and Rinkeby networks. Fund an account on the Ropsten network using a [Ropsten Faucet](https://faucet.dimensions.network) 

Download [ganache-2.5.4-linux-x86_64.AppImage](https://www.trufflesuite.com/ganache). Copy the downloaded file into the ./bin/ directory of the `nft/colors` React project.

Run Ganache and verify that you have a working blockchain. It is recommended to always run ganache from this directory rather than installing in a global location as version mismatches can be difficult to debug.
 
## Getting Started

With Ganache running, run the React development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
