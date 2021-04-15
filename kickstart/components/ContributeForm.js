import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import {ethers} from 'ethers';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class ContributeForm extends Component {

    state = {
      value: '',
      errorMessage: '',
      loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const campaign = Campaign(this.props.address);

        try {
          let value = ethers.utils.parseEther(this.state.value);
          const overrides = {
                  value: ethers.utils.parseEther(this.state.value),
          }
          let tx = await campaign.contribute(overrides);
          await tx.wait();
          Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch(err) {
          this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, value: ''});
    }

    render() {
      return (
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
              <label>Amount to Contribute</label>
              <Input 
                value={this.state.value}
                onChange={event => this.setState({value: event.target.value})}
                label="ether"
                labelPosition="right"
              />
          </Form.Field>
          <Message error header="something went wrong ..." content = {this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
              Contribute!
          </Button>
        </Form>
      );
    }
}

export default ContributeForm;
