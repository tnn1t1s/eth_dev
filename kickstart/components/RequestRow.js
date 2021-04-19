import React, {Component} from 'react';
import { Button, Table } from 'semantic-ui-react';
import {ethers} from 'ethers';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {

    onApprove = async () => {
      const campaign = Campaign(this.props.address);
      await campaign.approveRequest(this.props.id);
    };

    onFinalize = async () => {
      const campaign = Campaign(this.props.address);
      await campaign.finalizeRequest(this.props.id);
    };

    render() {
      const { Row, Cell } = Table;
      const { id, request, approversCount } = this.props;
      // TODO: use native getter and destructure into this.
      let value = ethers.BigNumber.from(request[1]);
      let approvalCount = ethers.BigNumber.from(request[2]);
      let approversCountNumber = ethers.BigNumber.from(approversCount);

      return (
        <Row>
          <Cell>{id}</Cell>
          <Cell>{request[0]}</Cell>
          <Cell>{value.toString()}</Cell>
          <Cell>{approvalCount.toString()}/{approversCountNumber.toString()}</Cell>
          <Cell>
              <Button color="green" basic onClick={this.onApprove}>Approve</Button>
          </Cell>
          <Cell>
              <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>
          </Cell>
        </Row>
      );
    }
}

export default RequestRow;
