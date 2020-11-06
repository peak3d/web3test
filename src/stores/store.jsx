import { YELD_BURNED, ADDRESS_INDEX_CHANGED } from './constants'
import yeldConfig from '../config/yeldConfig'

const ethers = require('ethers');
const Emitter = require('events').EventEmitter;

var emitter = new Emitter();

const burnAddress = '0x0000000000000000000000000000000000000000'

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
    if (this.addressIndex !== index) {
      this.addressIndex = index
      this.setupContracts()
      emitter.emit(ADDRESS_INDEX_CHANGED, index)
    }
  }
  
  setProvider(provider) {
    this.ethersProvider = provider
    this.setupContracts()
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
        emitter.emit(YELD_BURNED)
      });
      // Fire the initial one
      emitter.emit(YELD_BURNED)
    } else {
      this.retirementYeldContract = null
      this.yDAIContract = null
      this.yTUSDContract = null
      this.yUSDTContract = null
      this.yUSDCContract = null
      this.yeldContract = null
    }
  }
  
  getBurnedYeld = async () => {
    try {
      const result = await this.yeldContract.balanceOf(burnAddress)
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
