import React, { Component } from 'react';
import {signer, provider} from '../ethereum/ethers';
import contract from '../ethereum/factory';

class CampaignIndex extends Component {
    state = {
        campaigns: []
    }

    /* getInitialProps is specific to Next framework
     * it allows for upfront data loading on server
     * it is `static` to allow for data fetching
     * without instantiation of the Component
     */
    static async getInitialProps() {
        const campaigns = await contract.getDeployedCampaigns();
        return { campaigns };
    }

    render() {
        return <div>{this.props.campaigns[0]}</div>
    }
}

export default CampaignIndex;
