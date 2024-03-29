import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {

  static async getInitialProps(props) {
   const { address } = props.query;
   const campaign = Campaign(address);
   const requestCount = await campaign.getRequestsCount();
   const approversCount = await campaign.approversCount();       

   const requests = await Promise.all(
     Array(parseInt(requestCount))
           .fill()
           .map((element, index) => {
             return campaign.getRequest(index);
           })
   );

   console.log(requests);
   return { address, requests, requestCount, approversCount};
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Requests</h3>
          <Link route={`/requests/${this.props.address}/new`}>
            <a>
              <Button primary floated="right" style={{ marginBottom: 10 }}>Add Request</Button>
            </a>
          </Link>
          <Table>
            <Header>
              <Row>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Value</HeaderCell>
                <HeaderCell>Approval Count</HeaderCell>
                <HeaderCell>Approve</HeaderCell>
                <HeaderCell>Finalize</HeaderCell>
              </Row>
            </Header>
            <Body>
              {this.renderRows()}
            </Body>
          </Table>
          <div>Found {this.props.requestCount.toString()} requests.</div>
      </Layout>
    );
  }
}

export default RequestIndex;
