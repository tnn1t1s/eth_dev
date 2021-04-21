import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { Component } from 'react';
import Layout from '../components/Layout';
import {ethers} from 'ethers';
import {signer, provider} from '../ethereum/ethers';
import Color from '../ethereum/color';


class Colors extends Component {
    /* getInitialProps is specific to Next framework
     * it allows for upfront data loading on server
     * it is `static` to allow for data fetching
     * without instantiation of the Component
     */
    static async getInitialProps() {
        const address = '0x057521539ADD8433F8e2a17b67cC3703DaCd2CC5'
        const color = Color(address);
        const _totalSupply = await color.totalSupply();
        const totalSupply = ethers.BigNumber.from(_totalSupply).toString();
        return { totalSupply };
    }

    render() {
      return (
          <Layout>
            <div>Colors</div>
            <div>{this.props.totalSupply}</div>
          </Layout>
    );
  }
}

export default Colors;
