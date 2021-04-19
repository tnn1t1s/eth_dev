import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import {ethers} from 'ethers';
import Campaign from '../../../ethereum/campaign';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {

  state = {
    value: '',
    description: '',
    recipient: '',
    errorMessage: '',
    loading: false
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address }
  }

  onSubmit = async event => {
      event.preventDefault();
      this.setState({loading: true, errorMessage: ''});

      const campaign = Campaign(this.props.address);
      const { description, value, recipient } = this.state;
      try {
        let tx = await campaign.createRequest(
                     description,
                     ethers.utils.parseEther(value),
                     recipient); 
        await tx.wait();
        Router.pushRoute(`/requests/${this.props.address}`);
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false,
                      value: '',
                      description: '',
                      recipient:''});
  }

  render() {
    return (
      <Layout>
        <Link route={`/requests/${this.props.address}`}>
           <a>Back</a>
        </Link>
        <h3>Create a Request</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={this.state.description}
            onChange={event =>
                this.setState({ description: event.target.value})} />
        </Form.Field>
        <Form.Field>
          <label>Value (ETH) </label>
          <Input
            value={this.state.value}
            onChange={event =>
                this.setState({ value: event.target.value})} />
        </Form.Field>
        <Form.Field>
          <label>Recipient Address</label>
          <Input
            value={this.state.recipient}
            onChange={event =>
                this.setState({ recipient: event.target.value})} />
        </Form.Field>
        <Message error header="Error!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>Create!</Button>
      </Form>
      </Layout>
    );
  }
}

export default RequestNew;
