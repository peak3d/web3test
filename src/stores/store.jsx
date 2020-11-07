import async from 'async';
import { 
  ERROR,
  YELD_CONTRACT,
  ADDRESS_INDEX_CHANGED,
  CONNECTION_ESTABLISHED,
  FILTER_AMOUNT,
  FILTER_BURNED,
  FILTER_SUPPLY
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
    this.ethersProvider = 0
    this.address = null
    
    this.retirementYeldContract = null;
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
  
  setProvider(provider, address) {
    this.ethersProvider = provider
    this.address = address
    this.setupContracts()
    emitter.emit(CONNECTION_ESTABLISHED)
  }
  
  setupContracts = async () => {
    if (this.yeldContract)
      this.yeldContract.removeAllListeners()

    if (this.ethersProvider) {
      this.retirementYeldContract = new ethers.Contract(yeldConfig.retirementYeldAddresses[this.addressIndex], yeldConfig.retirementYeldAbi, this.ethersProvider)
      this.yDAIContract = new ethers.Contract(yeldConfig.yDAIAddresses[this.addressIndex], yeldConfig.yDAIAbi, this.ethersProvider)
      this.yTUSDContract = new ethers.Contract(yeldConfig.yTUSDAddresses[this.addressIndex], yeldConfig.yDAIAbi, this.ethersProvider)
      this.yUSDTContract = new ethers.Contract(yeldConfig.yUSDTAddresses[this.addressIndex], yeldConfig.yDAIAbi, this.ethersProvider)
      this.yUSDCContract = new ethers.Contract(yeldConfig.yUSDCAddresses[this.addressIndex], yeldConfig.yDAIAbi, this.ethersProvider)
      
      this.yeldContract = new ethers.Contract(yeldConfig.yeldAddress, yeldConfig.yeldAbi, this.ethersProvider)
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
          if (data[0])
            asset.yeldAmount = data[0]
          if (data[1])
            asset.totalSupply = data[1]
          if (data[2])
            asset.yeldBurned = data[2]
          emitter.emit(YELD_CONTRACT, asset)
        }
      })
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
    callback(null, 1000);
  }

  fromWei(number) {
    const numberbn = ethers.BigNumber.from(number)
    const base = numberbn.div(ethers.constants.WeiPerEther)
    const decimals  = base.isZero() ? numberbn : numberbn.mod(base.mul(ethers.constants.WeiPerEther))
    return Number(base.toString() + '.' + decimals.toString())
  }
}

var store = new Store();

export default {
  store: store,
  emitter: emitter,
  dispatcher: dispatcher
};
