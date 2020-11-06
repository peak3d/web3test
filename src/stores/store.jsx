import { BLOCKTICKER, ADDRESS_INDEX_CHANGED } from './constants'
import yeldConfig from '../config/yeldConfig'

const ethers = require('ethers');
const Emitter = require('events').EventEmitter;

var emitter = new Emitter();

class Store {
  constructor() {
    this.addressIndex = 1
    this.ethersProvider = 0
    
    this.retirementYeldContract = null;
    this.yDAIContract = null
    this.yTUSDContract = null
    this.yUSDTContract = null
    this.yUSDCContract = null
    this.yeldContract = null
  }

  setYeldAddressIndex(index) {
    if (this.addressIndex != index) {
      this.addressIndex = index
      this.setupContracts()
      emitter.emit(ADDRESS_INDEX_CHANGED, index)
    }
  }
  
  setProvider(provider) {
    if (this.ethersProvider) {
      this.ethersProvider.removeAllListeners("block")
    }
    
    this.ethersProvider = provider

    if (this.ethersProvider) {
     this.ethersProvider.on("block", (blockNumber) => {
        // Emitted on every block change
        emitter.emit(BLOCKTICKER, blockNumber)
      })
    }
    this.setupContracts()
  }
  
  setupContracts = async () => {
    if (this.ethersProvider) {
      this.retirementYeldContract = new ethers.Contract(yeldConfig.retirementYeldAddresses[this.addressIndex], yeldConfig.retirementYeldAbi, this.ethersProvider)
      this.yDAIContract = new ethers.Contract(yeldConfig.yDAIAddresses[this.addressIndex], yeldConfig.yDAIAbi, this.ethersProvider)
      this.yTUSDContract = new ethers.Contract(yeldConfig.yTUSDAddresses[this.addressIndex], yeldConfig.yDAIAbi, this.ethersProvider)
      this.yUSDTContract = new ethers.Contract(yeldConfig.yUSDTAddresses[this.addressIndex], yeldConfig.yDAIAbi, this.ethersProvider)
      this.yUSDCContract = new ethers.Contract(yeldConfig.yUSDCAddresses[this.addressIndex], yeldConfig.yDAIAbi, this.ethersProvider)
      
      this.yeldContract = new ethers.Contract(yeldConfig.yeldAddress, yeldConfig.yeldAbi, this.ethersProvider)
    }
  }
  
  getBurnedYeld = async () => {
    try {
      const result = await this.yeldContract.balanceOf('0x0000000000000000000000000000000000000000')
      return result.div(ethers.constants.WeiPerEther.div(100)).toNumber()*0.01  
    } catch(e) {
      console.log(e)
      return null
    }
  }
}

var store = new Store();

export default {
  store: store,
  emitter: emitter
};
