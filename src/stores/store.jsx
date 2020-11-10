import async from 'async';
import {
  ERROR,
  YELD_CONTRACT,
  YELD_RETIREMENT,
  YELD_STAKE,
  YELD_UNSTAKE,
  ADDRESS_INDEX_CHANGED,
  CONNECTION_CHANGED,
  POOL_BALANCES,
  POOL_INVEST,
  POOL_REDEEM,
  FILTER_AMOUNT,
  FILTER_BURNED,
  FILTER_SUPPLY,
  FILTER_BALANCE,
  FILTER_STAKE,
} from './constants'

import yeldConfig from '../config/yeldConfig'

const ethers = require('ethers');
const Emitter = require('events').EventEmitter;
const Dispatcher = require('flux').Dispatcher;

var emitter = new Emitter();
var dispatcher = new Dispatcher();

const burnAddress = '0x0000000000000000000000000000000000000000'

class Store {
  constructor() {
    this.addressIndex = 1
    this.ethersProvider = null
    this.eventProvider = null
    this.address = null
    this.chainId = 1

    this.retirementYeldContract = null

    this.assets = [
    {
      id: 'DAIv2',
      name: 'DAI',
      symbol: 'DAI',
      description: 'DAI Stablecoin',
      investSymbol: 'yUSDC',
      contract: null,
      maxApr: 0,
      balance: 0,
      investedBalance: 0,
      price: 0,
      decimals: 18,
      version: 2,
      disabled: false,
      invest: 'deposit',
      redeem: 'withdraw',
    },
    {
      id: 'USDCv2',
      name: 'USD Coin',
      symbol: 'USDC',
      description: 'USD//C',
      investSymbol: 'yUSDC',
      contract: null,
      maxApr: 0,
      balance: 0,
      investedBalance: 0,
      price: 0,
      decimals: 6,
      poolValue: 0,
      version: 2,
      disabled: false,
      invest: 'deposit',
      redeem: 'withdraw',
    },
    {
      id: 'USDTv2',
      name: 'USDT',
      symbol: 'USDT',
      description: 'Tether USD',
      investSymbol: 'yUSDT',
      contract: null,
      maxApr: 0,
      balance: 0,
      investedBalance: 0,
      price: 0,
      decimals: 6,
      poolValue: 0,
      version: 2,
      disabled: false,
      invest: 'deposit',
      redeem: 'withdraw',
    },
    {
      id: 'TUSDv2',
      name: 'TUSD',
      symbol: 'TUSD',
      description: 'TrueUSD',
      investSymbol: 'yTUSD',
      contract: null,
      maxApr: 0,
      balance: 0,
      investedBalance: 0,
      price: 0,
      decimals: 18,
      poolValue: 0,
      version: 2,
      disabled: false,
      invest: 'deposit',
      redeem: 'withdraw',
    },
    ]

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case YELD_CONTRACT:
            this.getYeldContractData(payload.content);
            break;
          case YELD_RETIREMENT:
            this.getRetirementContractData(payload.content);
            break;
          case POOL_BALANCES:
            this.getPoolBalances(payload.content);
            break;
          case YELD_STAKE:
            this.stakeYeld(payload.content);
            break;
          case YELD_UNSTAKE:
            this.unstakeYeld(payload.content);
            break;
          default: {
          }
        }
      }.bind(this)
    )
  }

  getAssets = () => {
    return this.assets
  }

  setYeldAddressIndex(index) {
    if (this.addressIndex !== index) {
      this.addressIndex = index
      this.setupContracts()
      emitter.emit(ADDRESS_INDEX_CHANGED, index)
    }
  }

  setProvider(provider, eventProvider, chainId, address) {
    if (this.eventProvider)
      this.eventProvider.removeAllListeners();

    this.ethersProvider = provider
    this.eventProvider = eventProvider
    this.chainId = chainId
    this.address = address
    if (!this.setupContracts())
      this.ethersProvider = null
    else if (eventProvider)
      this.setupEvents()
    emitter.emit(CONNECTION_CHANGED, provider, address)
  }

  isConnected = () => {
    return this.ethersProvider!== null
  }

  setupContracts = async () => {
    if (this.yeldContract)
      this.yeldContract.removeAllListeners()

    this.assets.map((asset) => { asset.contract = null })

    if (this.ethersProvider) {
      const chainAddresses = yeldConfig.addresses[this.chainId]
      if (!chainAddresses)
        return false

      const signer = this.ethersProvider.getSigner()

      this.assets.map((asset) => {
        if (chainAddresses[asset.id][this.addressIndex] !== '')
          asset.contract = new ethers.Contract(chainAddresses[asset.id][this.addressIndex], yeldConfig.yDAIAbi, signer)
      })

      this.retirementYeldContract = new ethers.Contract(chainAddresses.retirementYeldAddresses[this.addressIndex], yeldConfig.retirementYeldAbi, signer)
      this.yeldContract = new ethers.Contract(chainAddresses.yeldAddress, yeldConfig.yeldAbi, signer)
    }
    return true
  }

  setupEvents() {
    // Event listener if YELD is Transfered to burnAdress
    const filter = this.yeldContract.filters.Transfer(null,burnAddress);
    this.eventProvider.on(filter, (log, event) => {
      this.getYeldContractData([FILTER_BURNED])
    })
  }

  getYeldContractData(filter) {
    if (filter.length)
      async.parallel([
        (callbackInner) => { this._getYeldAmount(filter, callbackInner) },
        (callbackInner) => { this._getYeldTotalSupply(filter, callbackInner) },
        (callbackInner) => { this._getYeldBurned(filter, callbackInner) },
      ], (err, data) => {
        if (err) {
          console.log(err)
          emitter.emit(ERROR, {error: err.toString()})
        }
        else {
          var asset = {}
          if (data[0] !== null)
            asset.yeldAmount = data[0]
          if (data[1] !== null)
            asset.totalSupply = data[1]
          if (data[2] !== null)
            asset.yeldBurned = data[2]
          emitter.emit(YELD_CONTRACT, asset)
        }
      })
  }

  getRetirementContractData(filter) {
    if (filter.length)
      async.parallel([
        (callbackInner) => { this._getStakeInfo(filter, callbackInner) },
        (callbackInner) => { this._getRetirementBalance(filter, callbackInner) },
      ], (err, data) => {
        if (err) {
          console.log(err)
          emitter.emit(ERROR, {error: err.message})
        }
        else {
          var asset = {}
          if (data[0] !== null)
            asset.stake = data[0]
          if (data[1] !== null)
            asset.balance = data[1]
          emitter.emit(YELD_RETIREMENT, asset)
        }
      })
  }

  getPoolBalances = async () => {
    async.map(this.assets, (asset, callback) => {
      async.parallel([
        (callbackInner) => { this._getERC20Balance(asset, callbackInner) },
        (callbackInner) => { this._getInvestedBalance(asset, callbackInner) },
        (callbackInner) => { this._getPoolPrice(asset, callbackInner) },
        (callbackInner) => { this._getMaxAPR(asset, callbackInner) },
      ], (err, data) => {
        asset.balance = data[0]
        asset.investedBalance = data[1]
        asset.price = data[2]
        asset.maxApr = data[3]

        callback(null, asset)
      })
    }, (err, assets) => {
      if(err) {
        return emitter.emit(ERROR, err)
      }

      return emitter.emit(POOL_BALANCES, assets)
    })
  }

  stakeYeld = async (amount) => {
    try {
      const retirementYeldAddress = yeldConfig.addresses[this.chainId].retirementYeldAddresses[this.addressIndex]
      const allowance = await this.yeldContract.allowance(this.address, retirementYeldAddress)
      const amountToStake = this.toWei(amount)

      if (allowance.lt(amountToStake)) {
        const tx = await this.yeldContract.approve(retirementYeldAddress, amountToStake)
        await tx.wait();
      }

      const tx = await this.retirementYeldContract.stakeYeld(amountToStake)
      await tx.wait();

      emitter.emit(YELD_STAKE)
    } catch (e) {
      emitter.emit(YELD_STAKE, { error: e.message })
    }
  }

  unstakeYeld = async (amount) => {
    try {
      const amountToUnstake = this.toWei(amount)

      const tx = await this.retirementYeldContract.unstake(amountToUnstake)
      await tx.wait();

      emitter.emit(YELD_UNSTAKE)
    } catch (e) {
      emitter.emit(YELD_UNSTAKE, { error: e.message })
    }
  }

  _getYeldAmount = async (filter, callback) => {
    if (!filter.includes(FILTER_AMOUNT))
      return callback(null, null)

    try {
      const result = await this.yeldContract.balanceOf(this.address)
      callback(null, this.fromWei(result))
    } catch(e) {
      console.log(e)
      return callback(e)
    }
  }

  _getYeldBurned = async (filter, callback) => {
    if (!filter.includes(FILTER_BURNED))
      return callback(null, null)

    try {
      const result = await this.yeldContract.balanceOf(burnAddress)
      callback(null, this.fromWei(result))
    } catch(e) {
      console.log(e)
      return callback(e)
    }
  }

  _getYeldTotalSupply = async (filter, callback) => {
    if (!filter.includes(FILTER_SUPPLY))
      return callback(null, null)

    try {
      const result = await this.yeldContract.totalSupply()
      callback(null, this.fromWei(result))
    } catch(e) {
      console.log(e)
      return callback(e)
    }
  }

  _getStakeInfo = async (filter, callback) => {
    if (!filter.includes(FILTER_STAKE))
      return callback(null, null)

    try {
      const result = await this.retirementYeldContract.stakes(this.address)
      callback(null, result)
    } catch(e) {
      console.log(e)
      return callback(e)
    }
  }

  _getRetirementBalance = async (filter, callback) => {
    if (!filter.includes(FILTER_BALANCE))
      return callback(null, null)

    try {
      const retirementYeldAddress = yeldConfig.addresses[this.chainId].retirementYeldAddresses[this.addressIndex]
      const result = await this.ethersProvider.getBalance(retirementYeldAddress);
      callback(null, result)
    } catch(e) {
      console.log(e)
      return callback(e)
    }
  }

  _getERC20Balance(asset, callbackInner) {
    callbackInner(null,null);
  }

  _getInvestedBalance(asset, callbackInner){
    callbackInner(null,null);
  }

  _getPoolPrice(asset, callbackInner){
    callbackInner(null,null);
  }

  _getMaxAPR(asset, callbackInner){
    callbackInner(null,null);
  }

  fromWei(number) {
    return parseFloat(ethers.utils.formatEther(number))
  }

  toWei(number) {
    const parsed = number.toFixed(18)
    return ethers.utils.parseEther(parsed)
  }
}

var store = new Store();

export default {
  store: store,
  emitter: emitter,
  dispatcher: dispatcher
};
