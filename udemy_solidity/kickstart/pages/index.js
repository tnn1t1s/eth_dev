import React, { Component } from 'react';
import {signer, provider} from '../ethereum/ethers';
import contract from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';


class CampaignIndex extends Component {
    /* getInitialProps is specific to Next framework
     * it allows for upfront data loading on server
     * it is `static` to allow for data fetching
     * without instantiation of the Component
     */
    static async getInitialProps() {
        const campaigns = await contract.getDeployedCampaigns();
        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                        <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                        </Link>
                ),
                fluid: true // fit to page
            };
        });
        
        return <Card.Group items={items} />;
    }

    render() {
        return ( 
            <Layout>
              <div>
              <h3>open campaigns</h3>
              <Link route="campaigns/new">
              <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
              </a>
              </Link>
              {this.renderCampaigns()}
              </div>
            </Layout>
        );
    }
}

export default CampaignIndex;
