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
        //const address = '0x057521539ADD8433F8e2a17b67cC3703DaCd2CC5'
        const address = '0x94b64a0b066b24B15106d196ec9c1290ca405F8C';
        const contract = Color(address);
        const _totalSupply = await contract.totalSupply();
        const totalSupply = ethers.BigNumber.from(_totalSupply).toString();
        // load the colors
        let colors = []
        for (var i = 1; i <= totalSupply; i++) {
          const color = await contract.colors(i - 1);
          colors.push(color);
        }
        return { totalSupply, colors };
    }

    render() {
      return (
          <Layout>
            <div>Colors</div>
            <div>{this.props.totalSupply}</div>
            <div className="row text-center">
              { this.props.colors.map((color, key) => {
              return(
                <div key={key}>
                  <div className="token" style={{ backgroundColor: color }}>{color}</div>
                  <div>{color}</div>
                  </div>
              )
            })}
            </div>
          </Layout>
    );
  }
}

export default Colors;
