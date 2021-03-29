import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card } from 'semantic-ui-react';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.getSummary();
        return {
            minimumContribution: summary[0].toString(),
            balance: summary[1].toString(),
            requestCount: summary[2].toString(),
            approversCount: summary[3].toString(),
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw eth',
                style: { overflowWrap: 'break-word' }
            }        
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
              <h3>campaign</h3>
              {this.renderCards()}
            </Layout>
        );
    }
}

export default CampaignShow;
