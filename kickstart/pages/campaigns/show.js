import React, { Component } from 'react';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import Campaign from '../../ethereum/campaign';
import { Card, Grid } from 'semantic-ui-react';
import {ethers} from 'ethers';

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
            requestCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw ETH',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much WEI',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestCount,
                meta: 'Number of Requests',
                description: 'A request to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Numer of people who have already donated to this campaign',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: ethers.utils.formatUnits(balance, "ether"),
                meta: 'Campaign Balance (ETH)',
                description: 'Amount of money in campaign',
                style: { overflowWrap: 'break-word' }
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
              <h3>campaign</h3>
              <Grid>
                <Grid.Column width={12}>
                  {this.renderCards()}
                </Grid.Column>
                <Grid.Column width={4}>
                  <ContributeForm />
                </Grid.Column>
              </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;
