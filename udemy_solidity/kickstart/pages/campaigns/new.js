import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import {ethers} from 'ethers';
import { provider, signer, contract } from '../../ethereum/ethers';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
         minimumContribution: '', 
         errorMessage: '',
         loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true,
                        errorMessage: ''
        });
        try {
          let i = this.state.minimumContribution.trim();
          let v = ethers.BigNumber.from(i);
          let tx = await contract.createCampaign(v);
          await tx.wait();
          Router.pushRoute('/');
        } catch (err) {
          this.setState({errorMessage: err.message});
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
            <h3>Create a Campaign</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Minimum Contribution</label>
                <Input
                  label="wei"
                  labelPosition="right"
                  value={this.state.minimumContribution}
                  onChange={event => this.setState({minimumContribution: event.target.value})}/>
              </Form.Field>
              <Message error header="Oops!" content={this.state.errorMessage} />
              <Button primary loading={this.state.loading}>Create!</Button>
            </Form>
            </Layout>
        );
    }
}

export default CampaignNew;
