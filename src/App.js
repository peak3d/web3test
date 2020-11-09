import React, { Component } from 'react';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import interestTheme from './theme';
import { colors } from './theme'
import {
  Switch,
  Route
} from "react-router-dom";
import IpfsRouter from 'ipfs-react-router'
import Header from './components/header';
import StakeSimple from './components/stakeSimple';

import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const store = require('./stores/store').default.store

interface IAppState {
  connected: boolean;
  address: string;
  chainId: number;
  networkName: string;
}

const INITIAL_STATE: IAppState = {
  connected: false,
  address: null,
  chainId: 1,
  networkName: 'mainnet',
};

class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    }

    this.web3Modal = new Web3Modal({
      network: this.state.networkName,
      cacheProvider: true,
      providerOptions: this.getProviderOptions()
    })

    this.ethersProvider = null
    this.web3Provider = null
  }

  componentDidMount() {
    if (this.web3Modal.cachedProvider) {
      this.setup()
    }
  }

  subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return
    }

    provider.on("close", () => {
      this.resetApp()
    })

    provider.on("disconnect", () => {
      this.resetApp()
    })

    provider.on("accountsChanged", async (accounts: string[]) => {
      if (accounts[0] !== this.state.address)
      {
        store.setProvider(this.ethersProvider, this.state.chainId, accounts[0])
        await this.setState({ address: accounts[0] });
      }
    })

    provider.on("chainChanged", async (chainId: number) => {
      if (chainId !== this.state.chainId)
      {
        store.setProvider()
        await this.setup()
      }
    })

    provider.on("networkChanged", async (networkId: number) => {
      const network = await this.ethersProvider.getNetwork();
      const chainId = network.chainId;
      const networkName = network.name;
      store.setProvider(this.ethersProvider, chainId, this.state.address)
      await this.setState({ chainId, networkName });
    })
  };

  getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID
        }
      }
    }
    return providerOptions
  }

  setup = async () => {
    try {
      if (!this.web3Provider) {
        this.web3Provider = await this.web3Modal.connect()
        await this.subscribeProvider(this.web3Provider)
      }

      this.ethersProvider = new ethers.providers.Web3Provider(this.web3Provider)
      const accounts = await this.ethersProvider.listAccounts()
      const address = accounts[0]
      const network = await this.ethersProvider.getNetwork()
      const chainId = network.chainId
      const networkName = network.name

      await this.setState({
        connected: true,
        address: address,
        chainId,
        networkName
      })
      store.setProvider(this.ethersProvider, chainId, address)
    } catch (e) {
      console.log(e)
      await this.resetApp()
    }
  }

  resetApp = async () => {
    store.setProvider()
    if (this.ethersProvider) {
      localStorage.removeItem('walletconnect');
      this.ethersProvider = null;
      this.web3Provider = null;
    }
    await this.web3Modal.clearCachedProvider();
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme(interestTheme)}>
        <CssBaseline />
        <IpfsRouter>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            background: colors.white,
          }}>
            <Switch>
              <Route path="/">
                <Header
                  onConnect = {this.setup}
                  onDisconnect = {this.resetApp}
                  connected = {this.state.connected}
                  address = {this.state.address}
                  networkName = {this.state.networkName}
                />
                {/* <Vaults /> */}
                <StakeSimple
                  connected = {this.state.connected}
                />
              </Route>
            </Switch>
          </div>
        </IpfsRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
