import async from 'async';
import {
  ERROR,
  YELD_CONTRACT,
  YELD_RETIREMENT,
  YELD_STAKE,
  ADDRESS_INDEX_CHANGED,
  CONNECTION_CHANGED,
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
    this.address = null
    this.chainId = 1

    this.retirementYeldContract = null
    this.retirementYeldAddress = null
    this.yDAIContract = null
    this.yTUSDContract = null
    this.yUSDTContract = null
    this.yUSDCContract = null
    this.yeldContract = null

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case YELD_CONTRACT:
            this.getYeldContractData(payload.content);
            break;
          case YELD_RETIREMENT:
            this.getRetirementContractData(payload.content);
            break;
          case YELD_STAKE:
            this.stakeYeld(payload.content);
            break;
          default: {
          }
        }
      }.bind(this)
    )
  }

  setYeldAddressIndex(index) {
    if (this.addressIndex !== index) {
      this.addressIndex = index
      this.setupContracts()
      emitter.emit(ADDRESS_INDEX_CHANGED, index)
    }
  }

  setProvider(provider, chainId, address) {
    this.ethersProvider = provider
    this.chainId = chainId
    this.address = address
    if (!this.setupContracts())
      this.ethersProvider = null
    emitter.emit(CONNECTION_CHANGED, provider, address)
  }

  isConnected = () => {
    return this.ethersProvider!== null
  }

  setupContracts = async () => {
    if (this.yeldContract)
      this.yeldContract.removeAllListeners()

    if (this.ethersProvider) {
       const chainAddresses = yeldConfig.addresses[this.chainId]
       if (!chainAddresses)
         return false

      const signer = this.ethersProvider.getSigner()

      if (this.chainId === 1) {
        this.yDAIContract = new ethers.Contract(chainAddresses.yDAIAddresses[this.addressIndex], yeldConfig.yDAIAbi, signer)
        this.yTUSDContract = new ethers.Contract(chainAddresses.yTUSDAddresses[this.addressIndex], yeldConfig.yDAIAbi, signer)
        this.yUSDTContract = new ethers.Contract(chainAddresses.yUSDTAddresses[this.addressIndex], yeldConfig.yDAIAbi, signer)
        this.yUSDCContract = new ethers.Contract(chainAddresses.yUSDCAddresses[this.addressIndex], yeldConfig.yDAIAbi, signer)
      }

      this.retirementYeldAddress = chainAddresses.retirementYeldAddresses[this.addressIndex];
      this.retirementYeldContract = new ethers.Contract(this.retirementYeldAddress, yeldConfig.retirementYeldAbi, signer)
      this.yeldContract = new ethers.Contract(chainAddresses.yeldAddress, yeldConfig.yeldAbi, signer)
      // Event listener if YELD is Transfered to burnAdress
      const filter = this.yeldContract.filters.Transfer(null,burnAddress);
      this.yeldContract.on(filter, (from, to, amount, event) => {
        console.log('burn: ', from, ' -> ', to, 'Amt: ', amount)
        this.getYeldContractData([FILTER_BURNED])
      });
    } else {
      this.retirementYeldContract = null
      this.yDAIContract = null
      this.yTUSDContract = null
      this.yUSDTContract = null
      this.yUSDCContract = null
      this.yeldContract = null
    }
    return true
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

  stakeYeld = async (amount) => {
    try {
      const allowance = await this.yeldContract.allowance(this.address, this.retirementYeldAddress)
      const amountToStake = this.toWei(amount)

      if (allowance.lt(amountToStake)) {
        const tx = await this.yeldContract.approve(this.retirementYeldAddress, amountToStake)
        await tx.wait();
      }

      const gas = this.fromWei(await this.retirementYeldContract.estimateGas.stakeYeld(amountToStake))
      const tx = await this.retirementYeldContract.stakeYeld(amountToStake)
      await tx.wait();

      emitter.emit(YELD_STAKE)
    } catch (e) {
      emitter.emit(YELD_STAKE, { error: e.message })
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
      const result = await this.ethersProvider.getBalance(this.retirementYeldAddress);
      callback(null, result)
    } catch(e) {
      console.log(e)
      return callback(e)
    }
  }

  fromWei(number) {
    const numberbn = ethers.BigNumber.from(number)
    const base = numberbn.div(ethers.constants.WeiPerEther)
    const decimals  = base.isZero() ? numberbn : numberbn.mod(base.mul(ethers.constants.WeiPerEther))
    return Number(base.toString() + '.' + decimals.toString())
  }

  toWei(number) {
    // ethers implementation does not support decimals
    if (typeof number === 'number' && number % 1)
    {
      const decimals = (number % 1).toString().substr(2, 18)
      number = Math.trunc(number) + decimals +'0'.repeat(18 - decimals.length)
    }
    return ethers.BigNumber.from(number)
  }
}

var store = new Store();

export default {
  store: store,
  emitter: emitter,
  dispatcher: dispatcher
};
