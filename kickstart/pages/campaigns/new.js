import React, { Component } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import {ethers} from 'ethers';
import { provider, signer, contract } from '../../ethereum/ethers';

class CampaignNew extends Component {
    state = {
         minimumContribution: " "
    };

    onSubmit = async (event) => {
        event.preventDefault();
        let i = this.state.minimumContribution.trim();
        let v = ethers.BigNumber.from(i);
        await contract.createCampaign(v);
    };

    render() {
        return (
            <Layout>
            <h3>Create a Campaign</h3>
            <Form onSubmit={this.onSubmit}>
              <Form.Field>
                <label>Minimum Contribution</label>
                <Input
                  label="wei"
                  labelPosition="right"
                  value={this.state.minimumContribution}
                  onChange={event => this.setState({minimumContribution: event.target.value})}/>
              </Form.Field>
              <Button primary>Create!</Button>
            </Form>
            </Layout>
        );
    }
}

export default CampaignNew;
