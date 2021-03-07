import React, {Component} from 'react';
import './App.css';
import lottery from './lottery';
import {ethers} from 'ethers';

class App extends Component {
    state = { 
      message: '',
      block: 0,
      address: 0,
      manager: 'palaitis',
      account: 0,
      balance: 0,
      value: '0.1',
      contractBalance: 0,
      contractPlayers: []
    };

  async componentDidMount() {
    await window.ethereum.enable();
    const contract = lottery.contract;
    const block = await lottery.provider.getBlockNumber();
    const manager = await contract.manager();
    const players = await contract.getPlayers();
    const account = await lottery.signer.getAddress();
    const balance = await lottery.signer.getBalance();
    const contractBalance = await contract.provider.getBalance(lottery.address);

    this.setState({block});
    this.setState({manager});
    this.setState({account});
    this.setState({address : lottery.address});
    this.setState({balance: ethers.utils.formatEther(balance)});
    this.setState({contractBalance: ethers.utils.formatEther(contractBalance)});
    this.setState({contractPlayers: players});
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({message: 'waiting ...'});
    await lottery.contract.enter({
            from: this.account,
            value: ethers.utils.parseEther(this.state.value)
    });
    this.setState({message: 'you have been entered'});
  };

  onClick = async () => {
    this.setState({message: 'picking winner ...'});
    await lottery.contract.payWinner({
            from: this.account
    });
    this.setState({message: 'picked a winner ...'});
  }

  render() {
    return (
      <div>
        <h2>NFT Lottery Game on ETH Ropsten</h2>
        <p>block   : {this.state.block}</p>
        <p>manager : {this.state.manager}</p>
        <p>contract address : {this.state.address}</p>
        <p>contract balance : {this.state.contractBalance}</p>
        <p>number of players : {this.state.contractPlayers.length}</p>
        <p>account : {this.state.account}</p>
        <p>balance : {this.state.balance}</p>
        <hr />
        
        <form onSubmit={this.onSubmit}>
            <h4> enter the NFT lottery !</h4>
            <div>
              <label>amount of eth to enter</label>
              <input
                value={this.state.value}
                onChange={event => this.setState({value: event.target.value })}
              />
            </div>
            <button>Enter
            </button>
        </form>
        <hr />
        <h1>{this.state.message}</h1>
        <hr />
        <h4>Pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner.</button>
      </div>
    );
  }
}

export default App;
